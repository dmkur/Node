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

app.listen(PORT, () => { console.log('App listen', PORT); });
