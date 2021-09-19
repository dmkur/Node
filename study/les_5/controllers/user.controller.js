const User = require('../db/user-model.db');

const { passwordService } = require('../services');
const { USERNormalizator } = require('../utils/user-normalizator.utils');

module.exports = {
  getSingleUser: (req, res, next) => {
    try {
      const userToReturn = USERNormalizator(req.user);

      res.json(userToReturn);
    } catch (e) {
      next(e);
    }
  },
  createUsers: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashedPassword = await passwordService.hashPassword(password);

      const createdUser = await User.create({ ...req.body, password: hashedPassword });

      const userToReturn = USERNormalizator(createdUser);

      res.json(userToReturn);
    } catch (e) {
      next(e);
    }
  },
  getAllUsers: async (req, res, next) => {
    try {
      const allUsers = await User.find({}).select('-password -email');

      res.json(allUsers);
    } catch (e) {
      next(e);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      await User.deleteOne({ _id: user_id });

      res.json(`User with ID: ${user_id} deleted`);
    } catch (e) {
      next(e);
    }
  }
};
