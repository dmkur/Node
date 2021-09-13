const User = require('../dataBase/User-Model');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const allUsers = await User.find({});

      res.json(allUsers);
    } catch (e) {
      next(e);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const userById = await User.findById(user_id);

      res.json(userById);
    } catch (e) {
      next(e);
    }
  },
  createUser: async (req, res, next) => {
    try {
      const newUser = await User.create(req.body);

      res.json(newUser);
    } catch (e) {
      next(e);
    }
  },
  deleteUserById: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      await User.deleteOne({ _id: user_id });

      res.json(`User with id ${user_id} deleted`);
    } catch (e) {
      next(e);
    }
  },
};
