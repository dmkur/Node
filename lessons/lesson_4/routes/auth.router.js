const router = require('express').Router();

const { authControllers } = require('../controllers');

router.post('/', authControllers.loginUser);

module.exports = router;
