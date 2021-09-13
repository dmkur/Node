const User = require('../dataBase/User-Model');
const GeneralError = require('../errors/GeneralErrors');

module.exports = {
  isUserPresent: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const isUser = await User.findById(user_id);

      if (!isUser) {
        throw new GeneralError(418, `user ${user_id} not found`);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  checkUniqueEmail: async (req, res, next) => {
    try {
      const { email } = req.body;
      const userEmail = await User.findOne({ email });

      if (userEmail) {
        throw new GeneralError(409, `email ${email} already exist`);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
