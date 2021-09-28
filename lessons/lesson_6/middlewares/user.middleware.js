const User = require('../dataBase/User-model');
const ErrorHandler = require('../errors/ErrorHandler');
const { ADMIN } = require('../config/users-roles.enum');
const { userValidator } = require('../validators');

module.exports = {
  // має завжди 3 аргументи
  //  передає next
  isUserPresent: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      // оскільки password вертати З бази ЗАБОРОНЕНО є такі варіанти це не зробити
      // const user = await User.findById(user_id).select('_id email') //2й спосіб- поверне лише вибрані поля;
      // const user = await User.findById(user_id).select('-email') //2й спосіб- поверне усе крім вибраних полів;
      // const user = await User.findById(user_id).select('+password') //2й спосіб- поверне усе + вибрані поля;

      // lean() - userNormalise не працює, бо вертає монго обєкт, а lean його повертає в JSON.
      // усюди писати lean не завжди добре, зробимо це в самому userNormalise
      // ще варіант рядок 39 тоді lean не потрібен
      // const user = await User.findById(user_id).select('-password').lean();

      const user = await User.findById(user_id).select('-password');

      if (!user) {
        throw new ErrorHandler(418, 'User not FOUND _!');
      }

      // так прокидуються дані до контролерра
      // мутуємо req, req.user = user
      // user передасться в request наступного контролерра userDeleted, singleuser
      req.user = user;
      req.testParam = 'hello from middlewares';

      // спосіб обійтися без lean рядок 19
      // req.user = user.toObject();
      // req.user = user.toJSON();

      next(); // next пустий, так і має бути, він сприймає лише помилку якщо щось вписати
    } catch (e) {
      next(e);
    }
  },

  checkUniqueEmail: async (req, res, next) => {
    try {
      console.log('**********************************');
      console.log(req.user);
      console.log('**********************************');

      const { email } = req.body;

      const userByEmail = await User.findOne({ email });

      if (userByEmail) {
        throw new ErrorHandler(409, `Email ${email} is already exist`);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  // валідатор який перевірить наші дані ще до бази
  validateUserBody: (req, res, next) => {
    try {
      const { error, value } = userValidator.createUserValidator.validate(req.body);

      console.log('****************');
      console.log(value);
      console.log('****************');

      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsAdminMIddleware: (req, res, next) => {
    try {
      const { role } = req.user;

      if (!role === ADMIN) {
        throw new ErrorHandler(403, 'Only for admins');
      }
    } catch (e) {
      next(e);
    }
  },

  // динамічна перевірка ролі, де при виклику ми вказуємо параметр перевірки
  // виклик - checkIsUSerRoleMIddleware(['admin']) - тобто досьуп лише в адміна

  checkIsUSerRoleMIddleware: (rolesArr = []) => (req, res, next) => {
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

  getUserByDynemicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
    try {
      const value = req[searchIn][paramName];

      const user = await User.findOne({ [dbField]: value });

      if (!user) {
        throw new ErrorHandler(418, 'User not found');
      }

      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }
};
