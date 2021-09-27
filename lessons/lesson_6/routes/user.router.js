const router = require('express').Router();
const {
  isUserPresent, checkUniqueEmail, validateUserBody, checkIsUSerRoleMIddleware
} = require('../middlewares/user.middleware');

const { userControllers } = require('../controllers');

router.post('/', validateUserBody, checkUniqueEmail, userControllers.createUser);
router.get('/', userControllers.getAllUsers);
router.get('/:user_id', isUserPresent, userControllers.getSingleUser);
router.delete('/:user_id', isUserPresent, checkIsUSerRoleMIddleware(['admin']), userControllers.deleteUser);

module.exports = router;
