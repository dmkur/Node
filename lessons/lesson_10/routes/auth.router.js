const router = require('express').Router();

const { actonTokensEnum } = require('../config');
const { authControllers } = require('../controllers');
const { userMiddleware } = require('../middlewares');
const { validateAccessToken, validateRefreshToken, validateActionToken } = require('../middlewares/auth.middleware');

router.post('/',
  userMiddleware.getUserByDynemicParam('email'),
  userMiddleware.isUserNotPresent,
  authControllers.loginUser);

router.post('/logout',
  validateAccessToken,
  authControllers.logoutUser);

router.post('/refresh',
  validateRefreshToken,
  authControllers.refresh);

router.post('/password/forgot/send',
  userMiddleware.getUserByDynemicParam('email'),
  userMiddleware.isUserNotPresent,
  authControllers.sendEmailForgotPassword);

router.post('/password/forgot/set',
  userMiddleware.validateNewPassword,
  validateActionToken(actonTokensEnum.FORGOT_PASS),
  authControllers.setNewForgotPassword);

module.exports = router;
