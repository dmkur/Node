const User = require('../dataBase/User-model');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
  // має завжди 3 аргументи
  //  передає next
  isUserPresent: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const user = await User.findById(user_id);

      if (!user) {
        throw new ErrorHandler(418, 'User not FOUND _!');
      }

      // так прокидуються дані до контролерра
      // мутуємо req, req.user = user
      // user передасться в request наступного контролерра userDeleted, singleuser
      req.user = user;
      req.testParam = 'hello from middlewares';

      next(); // next пустий, так і має бути, він сприймає лише помилку якщо щось вписати
    } catch (e) {
      next(e);
    }
  },

  checkUniqueEmail: async (req, res, next) => {
    try {
      const { email } = req.body;

      const userByEmail = await User.findOne({ email });

      if (userByEmail) {
        throw new ErrorHandler(409, `Email ${email} is already exist`);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
