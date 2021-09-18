const express = require('express');
const mongoose = require('mongoose');

const { MONGOOSE_CONNECT, PORT } = require('./configs/variables');

const app = express();

mongoose.connect(MONGOOSE_CONNECT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.json('Pong');
});

// eslint-disable-next-line no-undef
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log('App listen', PORT);
});
