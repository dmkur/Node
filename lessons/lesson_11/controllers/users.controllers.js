const User = require('../dataBase/User-model');
const { emailActionsENUM } = require('../config');
const { userNormalizator } = require('../utils/user.util');
// eslint-disable-next-line no-unused-vars
const { passwordService, emailService, s3Service } = require('../services');

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
  // createUser: async (req, res, next) => {
  //   try {
  //     // дістаємо пароль
  //     const { password } = req.body;
  //     // хешуємо його через наш сервіс
  //     const hashedPassword = await passwordService.hash(password);
  //     // створюємо юзера, при цьому копіюємо body, та перезаписуємо пасворд
  //     const createdUser = await User.create({ ...req.body, password: hashedPassword });
  //
  //     // функція, що зітре нам поле password, відповідно база його не верне
  //     const userToReturn = userNormalizator(createdUser);
  //
  //     res.json(userToReturn);
  //   } catch (e) {
  //     next(e);
  //   }
  // },
  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashedPassword = await passwordService.hash(password);

      // створили юзера, йому присвоївся id
      let createdUser = await User.create({ ...req.body, password: hashedPassword });

      // перевіряємо чи є файли типу фото
      if (req.files && req.files.avatar) {
        // загружаємо фото до юзера
        // при загружанні створюємо назву фото з id юзера
        const s3Response = await s3Service.uploadFile(req.files.avatar, 'users', createdUser._id);

        // перезаписуємо нашого юзера
        // знаходимо по id додоаємо поле avatar, повертаємо нового юзера
        createdUser = await User.findByIdAndUpdate(
          createdUser._id,
          { avatar: s3Response.Location },
          { new: true }
        );
      }

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
