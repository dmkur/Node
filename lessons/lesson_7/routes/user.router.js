const router = require('express').Router();
const {
  isUserPresent, isUserNotPresent, validateUserBody, checkIsUserRoleMiddleware, getUserByDynemicParam
} = require('../middlewares/user.middleware');

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
  isUserNotPresent,
  checkIsUserRoleMiddleware(['admin']),
  userControllers.deleteUser);

module.exports = router;
