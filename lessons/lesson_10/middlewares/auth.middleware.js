const ErrorHandler = require('../errors/ErrorHandler');
const { verifyToken } = require('../services/jwt.service');
const { AUTHORIZATION } = require('../config/constants');
const OAuth = require('../dataBase/OAuth');
const ActionsTokens = require('../dataBase/ActionsTokens');

const { verifyActionToken } = require('../services/jwt.service');

module.exports = {
  validateAccessToken: async (req, res, next) => {
    try {
      // щоб знайти наш токен використовуємл header - authorization
      const access_token = req.get(AUTHORIZATION);

      if (!access_token) {
        throw new ErrorHandler(401, 'No token');
      }

      await verifyToken(access_token);

      const tokenFromDB = await OAuth.findOne({ access_token }).populate('user');

      if (!tokenFromDB) {
        throw new ErrorHandler(401, 'Not valid token');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  validateRefreshToken: async (req, res, next) => {
    try {
      // щоб знайти наш токен використовуємл header - authorization
      const refresh_token = req.get(AUTHORIZATION);

      if (!refresh_token) {
        throw new ErrorHandler(401, 'No token');
      }

      await verifyToken(refresh_token, 'refresh');

      const tokenFromDB = await OAuth.findOne({ refresh_token }).populate('user');

      if (!tokenFromDB) {
        throw new ErrorHandler(401, 'Not valid token');
      }

      req.loginUser = tokenFromDB.user;

      next();
    } catch (e) {
      next(e);
    }
  },
  validateActionToken: (tokenType) => async (req, res, next) => {
    try {
      const actionToken = req.get(AUTHORIZATION);

      if (!actionToken) {
        throw new ErrorHandler(401, 'No token');
      }

      await verifyActionToken(actionToken, tokenType);

      const tokenFromDB = await ActionsTokens.findOne({ token: actionToken }).populate('user');

      if (!tokenFromDB) {
        throw new ErrorHandler(401, 'Not valid token');
      }

      req.loginUser = tokenFromDB.user;

      next();
    } catch (e) {
      next(e);
    }
  }
};
