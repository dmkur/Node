const { AUTHORIZATION } = require('../config/constants');
const { userNormalizator } = require('../utils');
const { compare } = require('../services/password.service');
const { jwtService } = require('../services');
const OAuth = require('../dataBase/OAuth');
const ActionsTokens = require('../dataBase/ActionsTokens');
const { emailActionsENUM } = require('../config');
const { emailService, passwordService } = require('../services');
const { actonTokensEnum, variables } = require('../config');
const User = require('../dataBase/User-model');

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

      await emailService.sendMail(
        'dmytrokurdelchuk@gmail.com', // user.email
        emailActionsENUM.FORGOT_PASSWORD,
        { userName: user.name, forgotPassURL: `${variables.frontEndURL}/password?token=${actionToken}` }
      );

      res.json('forgot ok');
    } catch (e) {
      next(e);
    }
  },
  setNewForgotPassword: async (req, res, next) => {
    try {
      const { loginUser: { _id }, body: { password } } = req; // дістаємо ноаий пас
      const token = req.get(AUTHORIZATION); // дістати token

      const hashPassword = await passwordService.hash(password); // захешувати його новий пас

      await User.findByIdAndUpdate(_id, { password: hashPassword }); // створити новий захешований пас
      await ActionsTokens.deleteOne({ token }); // видалити тимчасовий токен
      await OAuth.deleteMany({ user: _id }); // розлогінити з усіх девайсів(видалили усі токени)

      res.json('forgot ok');
    } catch (e) {
      next(e);
    }
  }

};
