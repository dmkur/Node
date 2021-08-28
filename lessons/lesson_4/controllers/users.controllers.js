const db = require('../db/users');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
  getSingleUser: (req, res, next) => {
    try {
      const { user_id } = req.params;
      const user = db[user_id];

      if (!user) {
        throw new ErrorHandler(418, 'User not FOUND _!');
      }

      res.json(user);
    } catch (e) {
      next(e);
    }
  },
  getAllUsers: () => {

  },
  createUser: (req, res) => {
    res.json('OK');
  },
};
