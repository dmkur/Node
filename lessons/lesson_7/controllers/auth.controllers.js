const { userNormalizator } = require('../utils');
const { compare } = require('../services/password.service');
const { jwtService } = require('../services');

module.exports = {
  loginUser: async (req, res, next) => {
    try {
      const { user, body: { password } } = req;

      await compare(user.password, password);

      const tokenPair = jwtService.generateTokenPair();

      res.json({
        ...tokenPair,
        user: userNormalizator.userNormalizator(user)
      });
    } catch (e) {
      next(e);
    }
  }
};
