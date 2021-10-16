// ліба для відправки імейлів
const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASS, frontEndURL } = require('../config/variable');
const allTemplates = require('../email-templates');
const ErrorHandler = require('../errors/ErrorHandler');

// вказуємо наші вюшки як з HBS
// cwd - шлях звідки убло запущено аппку
// через cwd вкажемо наш шлях до вюшок(темплейтів)
const templateParser = new EmailTemplates({
  views: {
    root: path.join(process.cwd(), 'email-templates')
  }
});

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

const sendMail = async (userMail, emailAction, context = {}) => {
  // ств динамічні темплейти
  const templateInfo = allTemplates[emailAction];

  if (!templateInfo) {
    throw new ErrorHandler(500, 'Wrong template name');
  }

  const { templateName, subject } = templateInfo;
  context = { ...context, frontEndURL };

  // створюємо рендер наших темплейтів
  // після назви темплейта(welcome), можемо передати змінні

  // const html = await templateParser.render(templateName, { userName: 'D1mas' });
  // додаємо динамічну змінну
  const html = await templateParser.render(templateName, context);

  return transporter.sendMail({
    from: 'No reply',
    to: userMail,
    // subject: 'Nodemailer test',
    // після створення динамічного subject(a)
    // залишаємо лише subject
    subject,
    // html: '<div><h1>Hello from nodemailer</h1>'
    // після створення рендера записуємо лише html
    html
  });
};

module.exports = {
  sendMail
};
