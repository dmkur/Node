const router = require('express').Router();
const {
  isUserPresent,
  isUserNotPresent,
  validateUserBody,
  checkIsUserRoleMiddleware,
  getUserByDynemicParam,
} = require('../middlewares/user.middleware');

const { validateAccessToken } = require('../middlewares/auth.middleware');
const { fileMiddlaware } = require('../middlewares');

const { userControllers } = require('../controllers');

router.post('/',
  validateUserBody,
  fileMiddlaware.checkAvatar,
  getUserByDynemicParam('email'),
  isUserPresent,
  userControllers.createUser);

router.get('/',
  userControllers.getAllUsers);

router.get('/:user_id',
  getUserByDynemicParam('user_id', 'params', '_id'),
  userControllers.getSingleUser);

router.delete('/:user_id',
  validateAccessToken,
  getUserByDynemicParam('user_id', 'params', '_id'),
  isUserNotPresent,
  checkIsUserRoleMiddleware(['user']),
  userControllers.deleteUser);

module.exports = router;
