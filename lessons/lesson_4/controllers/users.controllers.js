const User = require('../dataBase/User-model');

module.exports = {
  getSingleUser: (req, res, next) => {
    try {
      // це праметри які ми прокинули з middleware isUserPresent
      const { user, testParam } = req;
      console.log(user, testParam);

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
  deleteUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      await User.deleteOne({ _id: user_id });

      res.status(204).json(`User id ${user_id} deleted`);
    } catch (e) {
      next(e);
    }
  }
};
