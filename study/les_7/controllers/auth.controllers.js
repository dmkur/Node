const { compare } = require('bcrypt');
const { jwtService } = require('../services');
const { userNormalizator } = require('../utils/user.util');

module.exports = {
  loginUser: async (req, res, next) => {
    try {
      const { user, body: { password } } = req;

      await compare(user.password, password);

      const tokenPair = jwtService.generateTokenPair();

      res.json({
        ...tokenPair, user: userNormalizator(user)
      });
    } catch (e) {
      next(e);
    }
  }
};
