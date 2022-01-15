// регулярки - тобто вирази що встановлюють правила для данних
// в нашому випадку для паролю та мила

// ****** Увага *****
// правила, тобто регулярки, повинні співпадати на бекенді і фронті
module.exports = {
  PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
  EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
  CURRENT_YEAR: new Date().getFullYear(),
  AUTHORIZATION: 'Authorization',

  PHOTO_MAX_SIZE: 10 * 1024 * 1024,
  MIMETYPES: {
    PHOTO: [
      'image/jpeg',
      'image/png'
    ],
    VIDEO: []
  }
};
