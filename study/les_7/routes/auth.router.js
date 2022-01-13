const router = require('express').Router();

const { authControllers } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.post(
  '/',
  userMiddleware.getUserByDynemicParam('email'),
  userMiddleware.isUserNotPresent,
  authControllers.loginUser
);

module.exports = router;
