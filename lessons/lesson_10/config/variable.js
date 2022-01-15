module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/node-dmkur-2021',

  ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'Secret',
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'S_2',

  FORGOT_PASS_SECRET_KEY: process.env.FORGOT_PASS_SECRET_KEY || 'secretForgot',

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'dmytrokurdelchuk@gmail.com',
  NO_REPLY_EMAIL_PASS: process.env.NO_REPLY_EMAIL_PASS || 'dmkur_2021UA',

  frontEndURL: process.env.frontEndURL || 'https://www.google.com',

  AWS_S3_NAME: process.env.AWS_S3_NAME || '',
  AWS_S3_REGION: process.env.AWS_S3_REGION || '',
  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY || '',
  AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY || '',
};
