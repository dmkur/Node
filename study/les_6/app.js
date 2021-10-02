const express = require('express');
const mongoose = require('mongoose');

const { PORT, MONGO_CONNECT_URL } = require('./confg/variables.config');

require('dotenv').config();

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { _notFoundError, _mainErrorCather } = require('./errors/error.utils');
const { userRouter } = require('./routes');

app.get('/ping', (req, res) => {
  res.json('pong');
});

app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorCather);

app.listen(5001, () => {
  console.log('App listen', PORT);
});
