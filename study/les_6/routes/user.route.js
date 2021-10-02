const router = require('express').Router();

const { validateUserBody } = require('../middlewares/user.middleware');
const userController = require('../controllers/user.controller');

router.post('/', validateUserBody, userController.createUser);

module.exports = router;
