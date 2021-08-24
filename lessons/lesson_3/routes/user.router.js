const router = require('express').Router();

// файл що займається бізнес-логікою, тобто Router - направляє,
// controllers - виконує задачу, напр знайти юзерів
const { userControllers } = require('../controllers');

//          Усі ендпоїнти вже мають /users перед собою
// відповідно усі адреси, що у файлі це ве наступні наприклад
// users/, users/:user_id
router.post('/', userControllers.createUser);
router.get('/', userControllers.getAllUsers);
router.get('/:user_id', userControllers.getSingleUser);

module.exports = router ;
