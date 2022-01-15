const express = require('express');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');

require('dotenv').config();
// require('dotenv').config({path: }); // вказування шляху до файлу

const { PORT, MONGO_CONNECT_URL } = require('./config/variable');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

app.get('/ping', (req, res) => {
  res.end('pong');
});
const { authRouter, userRouter } = require('./routes');

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
  // console.log('***********************************');
  // console.log(process.env);
  // console.log('***********************************');
  console.log('App listen', PORT);
});

function _notFoundError(err, res, req, next) {
  next({
    status: err.status || 404,
    message: err.message || 'Not found'
  });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({ message: err.message });
}
