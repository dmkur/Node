const router = require('express').Router();

const { authControllers } = require('../controllers');
const { userMiddleware } = require('../middlewares');
const { validateAccessToken, validateRefreshToken } = require('../middlewares/auth.middleware');

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

module.exports = router;
