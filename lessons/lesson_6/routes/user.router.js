const router = require('express').Router();
const {
  isUserPresent, checkUniqueEmail, validateUserBody, checkIsUSerRoleMIddleware, getUserByDynemicParam
} = require('../middlewares/user.middleware');

const { userControllers } = require('../controllers');

router.post('/',
  validateUserBody,
  getUserByDynemicParam('email', 'body'),
  checkUniqueEmail,
  userControllers.createUser);

router.get('/',
  userControllers.getAllUsers);

router.get('/:user_id',
  getUserByDynemicParam('user_id', 'params', '_id'),
  userControllers.getSingleUser);

router.delete('/:user_id',
  isUserPresent,
  checkIsUSerRoleMIddleware(['admin']),
  userControllers.deleteUser);

module.exports = router;
