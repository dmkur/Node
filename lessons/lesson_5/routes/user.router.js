const router = require('express').Router();
const { isUserPresent, checkUniqueEmail, validateUserBody } = require('../middlewares/user.middleware');

// файл що займається бізнес-логікою, тобто Router - направляє,
// controllers - виконує задачу, напр знайти юзерів
const { userControllers } = require('../controllers');

//          Усі ендпоїнти вже мають /users перед собою
// відповідно усі адреси, що у файлі це ве наступні наприклад
// users/, users/:user_id
router.post('/', validateUserBody, checkUniqueEmail, userControllers.createUser);
router.get('/', userControllers.getAllUsers);
router.get('/:user_id', isUserPresent, userControllers.getSingleUser);
router.delete('/:user_id', isUserPresent, userControllers.deleteUser);

module.exports = router;
