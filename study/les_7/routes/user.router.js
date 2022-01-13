const router = require('express').Router();
const {
  isUserPresent, isUserNotPresent, validateUserBody, getUserByDynemicParam
} = require('../middlewares/user.middleware');

const { authMiddleware } = require('../middlewares');

const { userControllers } = require('../controllers');

router.post(
  '/',
  validateUserBody,
  getUserByDynemicParam('email'),
  isUserPresent,
  userControllers.createUser
);

router.get(
  '/',
  userControllers.getAllUsers
);
router.get(
  '/:user_id',
  getUserByDynemicParam('user_id', 'params', '_id'),
  userControllers.getSingleUser
);

router.delete(
  '/:user_id',
  authMiddleware.validateAccessToken,
  getUserByDynemicParam('user_id', 'params', '_id'),
  isUserNotPresent,
  userControllers.deleteUser
);

module.exports = router;
