const { AUTHORIZATION } = require('../config/constants');
const { userNormalizator } = require('../utils');
const { compare } = require('../services/password.service');
const { jwtService } = require('../services');
const OAuth = require('../dataBase/OAuth');
const ActionsTokens = require('../dataBase/ActionsTokens');
const { actonTokensEnum } = require('../config');

module.exports = {
  loginUser: async (req, res, next) => {
    try {
      const { user, body: { password } } = req;

      await compare(user.password, password);

      const tokenPair = jwtService.generateTokenPair();

      await OAuth.create({ ...tokenPair, user: user._id });

      res.json({
        ...tokenPair,
        user: userNormalizator.userNormalizator(user)
      });
    } catch (e) {
      next(e);
    }
  },
  logoutUser: async (req, res, next) => {
    try {
      const access_token = req.get(AUTHORIZATION);

      await OAuth.deleteOne({ access_token });

      res.json('OK LOGOUT');
    } catch (e) {
      next(e);
    }
  },
  refresh: async (req, res, next) => {
    try {
      const refresh_token = req.get(AUTHORIZATION);

      const user = req.loginUser;

      await OAuth.deleteOne({ refresh_token });

      const tokenPair = jwtService.generateTokenPair();

      await OAuth.create({ ...tokenPair, user: user._id });

      res.json({
        ...tokenPair,
        user: userNormalizator.userNormalizator(user)
      });
    } catch (e) {
      next(e);
    }
  },
  sendEmailForgotPassword: async (req, res, next) => {
    try {
      const { user } = req;

      const actionToken = jwtService.generateActionToken(actonTokensEnum.FORGOT_PASS);

      await ActionsTokens.create({ token: actionToken, user: user._id });

      res.json('forgot ok');
    } catch (e) {
      next(e);
    }
  }

};
