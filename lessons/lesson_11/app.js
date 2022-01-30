const express = require('express');
const mongoose = require('mongoose');
// ліба для невеличкої підвищення секюрності
const helmet = require('helmet');
// ліба для крос оріджин запити (запити між доменами)
const cors = require('cors');
const expressFileUpload = require('express-fileupload');
// ліба для обмеження запитів з конкретного ip
const expressRateLimit = require('express-rate-limit');

require('dotenv').config();
// require('dotenv').config({path: }); // вказування шляху до файлу

const { PORT, MONGO_CONNECT_URL, ALLOWED_ORIGINS } = require('./config/variable');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(helmet());
app.use(cors());
app.use(expressRateLimit({
  windowMs: 15 * 60 * 1000, // хв сек мс тобто 15 хв
  max: 100 // максимум реквестів
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

// ліба для відслідковування респонсів
// йде лише для розробки для продакшина не потрібна
if (process.env.NODE_ENV === 'dev') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

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

// eslint-disable-next-line no-unused-vars
function _configureCors(origin, callback) {
  // eslint-disable-next-line no-unused-vars
  const whiteList = ALLOWED_ORIGINS.split(';');
}
