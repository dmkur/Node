const express = require('express');
const mongoose = require('mongoose');

const { MONGOOSE_CONNECT, PORT } = require('./configs/variables');
const { userRouter } = require('./routes');
const { _generalErrorCapture, _notFoundError } = require('./errors/errors-fuctions');

const app = express();

mongoose.connect(MONGOOSE_CONNECT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.json('Pong');
});

app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_generalErrorCapture);

app.listen(PORT, () => {
  console.log('App listen', PORT);
});
