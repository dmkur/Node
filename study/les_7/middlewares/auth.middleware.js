const ErrorHandler = require('../errors/ErrorHandler');
const { verifyToken } = require('../services/jwt.service');
const { AUTHORIZATION } = require('../config/constants');

module.exports = {
  validateAccessToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(401, 'No token');
      }

      await verifyToken(token);

      next();
    } catch (e) {
      next(e);
    }
  }
};
