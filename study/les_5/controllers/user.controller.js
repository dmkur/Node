const User = require('../db/user-model.db');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const allUsers = await User.find({});

      res.json(allUsers);
    } catch (e) {
      next(e);
    }
  }
};
