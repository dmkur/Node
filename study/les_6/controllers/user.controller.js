const User = require('../dataBase/User-model');
const userNormalizator = require('../utils/userNormalizator.utils');
const passwordService = require('../services/password.service');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashPassword = await passwordService.hashPassword(password);

      const createdUser = await User.create({ ...req.body, password: hashPassword });

      const userToReturn = userNormalizator.userNormalizator(createdUser);

      res.json(userToReturn);
    } catch (e) {
      next(e);
    }
  }
};
