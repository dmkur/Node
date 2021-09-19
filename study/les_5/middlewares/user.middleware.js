const CustomError = require('../errors/CustomError');
const { userValidator } = require('../validators');
const User = require('../db/user-model.db');

module.exports = {
  checkUniqueEmail: async (req, res, next) => {
    try {
      const { email } = req.body;

      const userByEmail = await User.findOne({ email });

      if (userByEmail) {
        throw new CustomError(409, `Email ${email} is already exist`);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  checkUserBody: (req, res, next) => {
    try {
      const { error, value } = userValidator.createUserValidator.validate(req.body);
      console.log(value);

      if (error) {
        throw new CustomError(400, error.details[0].message);
      }
      next();
    } catch (e) {
      next(e);
    }
  },
  isUserPresent: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const isUser = await User.findById(user_id);

      if (!isUser) {
        throw new CustomError(400, 'User not found:D');
      }

      req.user = isUser;

      next();
    } catch (e) {
      next(e);
    }
  }
};
