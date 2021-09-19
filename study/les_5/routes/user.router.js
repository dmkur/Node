const router = require('express').Router();

const { userController } = require('../controllers');
const { checkUserBody, checkUniqueEmail } = require('../middlewares/user.middleware');

router.post('/', checkUserBody, checkUniqueEmail, userController.createUsers);
router.get('/', userController.getAllUsers);
// router.get('/:user_id',);
// router.delete('/:user_id',);

module.exports = router;
