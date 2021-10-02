const { userValidator } = require('../validators');
const CustomError = require('../errors/CustomError');

module.exports = {
  validateUserBody: (req, res, next) => {
    try {
      const { error, value } = userValidator.createUserValidator.validate(req.body);

      console.log(value, error);

      if (error) {
        throw new CustomError(400, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
