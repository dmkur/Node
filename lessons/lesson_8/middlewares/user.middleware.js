const User = require('../dataBase/User-model');
const ErrorHandler = require('../errors/ErrorHandler');
const { ADMIN } = require('../config/users-roles.enum');
const { userValidator } = require('../validators');

module.exports = {
  isUserNotPresent: (req, res, next) => {
    try {
      const { user } = req;

      if (!user) {
        throw new ErrorHandler(404, 'user not found');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  isUserPresent: (req, res, next) => {
    try {
      const { user } = req;

      if (user) {
        throw new ErrorHandler(409, 'user already exist');
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  validateUserBody: (req, res, next) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { error, value } = userValidator.createUserValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsAdminMiddleware: (req, res, next) => {
    try {
      const { role } = req.user;

      if (!role === ADMIN) {
        throw new ErrorHandler(403, 'Only for admins');
      }
    } catch (e) {
      next(e);
    }
  },

  checkIsUserRoleMiddleware: (rolesArr = []) => (req, res, next) => {
    try {
      const { role } = req.user;

      // якщо в масив пустий ідемо далі, тобто доступ мають усі якщо
      // запис наступний checkIsUSerRoleMIddleware([])
      if (!rolesArr.length) {
        return next();
      }

      // якщо масив не містить ролі, помилку вибиваємо
      // тобто виклтк checkIsUSerRoleMIddleware(['admin']) доступ лише адміну
      // а в нас просто юзер  - помилка
      if (!rolesArr.includes(role)) {
        throw new ErrorHandler(403, 'Only for admins');
      }
    } catch (e) {
      next(e);
    }
  },

  // дана middleware повинна лише находити юзера або ні, ніяких інших дій типу помиилок
  // помилки будуть створювати дві інші middleware
  getUserByDynemicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
    try {
      const value = req[searchIn][paramName];

      const user = await User.findOne({ [dbField]: value });

      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }
};
