// ліба для відправки імейлів
const nodemailer = require('nodemailer');
const { NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASS } = require('../config/variable');

const sendMail = (userMail) => {
  // транспотрер - саме він займається відправкою
  // додатково встановимо опції nodemailer
  // це буде typescript ліба
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: NO_REPLY_EMAIL,
      pass: NO_REPLY_EMAIL_PASS
    }
  });
  return transporter.sendMail({
    from: 'No reply',
    to: userMail,
    subject: 'Nodemailer test',
    html: '<div><h1>Hello from nodemailer</h1>'
  });
};

module.exports = {
  sendMail
};
