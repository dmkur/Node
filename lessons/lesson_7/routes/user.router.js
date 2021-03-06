const router = require('express').Router();
const {
  // eslint-disable-next-line no-unused-vars
  isUserPresent, isUserNotPresent, validateUserBody, checkIsUserRoleMiddleware, getUserByDynemicParam
} = require('../middlewares/user.middleware');

const { validateAccessToken } = require('../middlewares/auth.middleware');

const { userControllers } = require('../controllers');

router.post('/',
  validateUserBody,
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
  // checkIsUserRoleMiddleware(['user']),
  userControllers.deleteUser);

module.exports = router;
