const express = require('express');

// const fs = require('fs');
// const path = require('path');

const { PORT } = require('./config/variable');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.end('pong');
});

// Для використання файлу user.router.js або auth.router
const { authRouter, userRouter } = require('./routes');
// Усі ендпоїнти які починаються на /users будуть направлятись
// на userRouter, який в свою чергу на інші адресси
app.use('/auth', authRouter);
app.use('/users', userRouter);
// усі інші ендпоїнти відправ на _notFoundError
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => { console.log('App listen', PORT); });

// відловлювач помилки
// при помилці, дані ідуть в catch і переходять на рівень вище
// її відловлює app.use('*', _notFoundError); від помилає її на _notFoundError
// _notFoundError - формує об'єкт
// next - означає, передай дані далі
// в даному випадку на наступний обробник _mainErrorHandler
function _notFoundError(err, res, req, next) {
  next({
    status: err.status || 404,
    message: err.message || 'Not found'
  });
}

// дана функція з помилки візьме дані і створить необхідні меседжи для нас

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({ message: err.message });
}
