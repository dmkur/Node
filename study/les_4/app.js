const express = require('express');
const mongoose = require('mongoose');

const { PORT } = require('./config/variables');

const app = express();

mongoose.connect('mongodb://localhost:27017/node-dmkur-2021');

const { userRoutes } = require('./routes');
const { _notFoundError, _captureError } = require('./errors/utilsError');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.json('pong');
});

app.use('/users', userRoutes);
app.use('*', _notFoundError);
app.use(_captureError);

app.listen(PORT, () => {
  console.log('App listen', PORT);
});
