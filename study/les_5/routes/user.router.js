const router = require('express').Router();

const { userController } = require('../controllers');
const { checkUserBody, checkUniqueEmail, isUserPresent } = require('../middlewares/user.middleware');

router.post('/', checkUserBody, checkUniqueEmail, userController.createUsers);
router.get('/', userController.getAllUsers);
router.get('/:user_id', isUserPresent, userController.getSingleUser);
router.delete('/:user_id', isUserPresent, userController.deleteUser);

module.exports = router;
