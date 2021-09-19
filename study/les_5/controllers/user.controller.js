const User = require('../db/user-model.db');

const { passwordService } = require('../services');
const { userNormalizator } = require('../utils');

module.exports = {

  createUsers: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashedPassword = await passwordService.hashPassword(password);

      const createdUser = await User.create({ ...req.body, password: hashedPassword });

      const userToReturn = userNormalizator(createdUser);

      res.json(userToReturn);
    } catch (e) {
      next(e);
    }
  },
  getAllUsers: async (req, res, next) => {
    try {
      const allUsers = await User.find({});

      res.json(allUsers);
    } catch (e) {
      next(e);
    }
  }

};
