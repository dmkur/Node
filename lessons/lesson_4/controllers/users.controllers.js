// const db = require('../db/users');
const User = require('../dataBase/User-model');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
  getSingleUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      // звернення до реальної бази через findById
      // є різні методи
      const user = await User.findById(user_id);

      if (!user) {
        throw new ErrorHandler(418, 'User not FOUND _!');
      }

      res.json(user);
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
  },
  createUser: async (req, res, next) => {
    try {
      // при створенні юзера, ми це робимл через body в postman
      // данні повинні відповідати нашій моделі User
      const createdUser = await User.create(req.body);

      res.json(createdUser);
    } catch (e) {
      next(e);
    }
  },
};
