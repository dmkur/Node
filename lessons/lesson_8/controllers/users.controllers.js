const User = require('../dataBase/User-model');
const { emailActionsENUM } = require('../config');
const { userNormalizator } = require('../utils/user.util');
const { passwordService, emailService } = require('../services');

module.exports = {
  getSingleUser: async (req, res, next) => {
    try {
      const userToReturn = userNormalizator(req.user);

      await emailService.sendMail(
        'dmytrokurdelchuk@gmail.com',
        emailActionsENUM.WELCOME,
        { userName: req.user.name }
      );

      res.json(userToReturn);
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
      // дістаємо пароль
      const { password } = req.body;
      // хешуємо його через наш сервіс
      const hashedPassword = await passwordService.hash(password);
      // створюємо юзера, при цьому копіюємо body, та перезаписуємо пасворд
      const createdUser = await User.create({ ...req.body, password: hashedPassword });

      // функція, що зітре нам поле password, відповідно база його не верне
      const userToReturn = userNormalizator(createdUser);

      res.json(userToReturn);
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
