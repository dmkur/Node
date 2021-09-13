const router = require('express').Router();

const { userControllers } = require('../controllers');
const { isUserPresent, checkUniqueEmail } = require('../middlewares/user.middleware');

router.get('/', userControllers.getAllUsers);
router.post('/', checkUniqueEmail, userControllers.createUser);
router.get('/:user_id', isUserPresent, userControllers.getUserById);
router.delete('/:user_id', isUserPresent, userControllers.deleteUserById);

module.exports = router;
