module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/node-dmkur-2021',

  ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'Secret',
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'S_2',

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'dmytrokurdelchuk@gmail.com',
  NO_REPLY_EMAIL_PASS: process.env.NO_REPLY_EMAIL_PASS || 'dmkur_2021UA',

  frontEndURL: process.env.frontEndURL || 'https://www.google.com'
};
