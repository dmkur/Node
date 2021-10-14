//  ліба для опису правил
//  наприклад password не менше 8 символів і т.д
const Joi = require('joi');
const { CURRENT_YEAR, EMAIL_REGEXP, PASSWORD_REGEXP } = require('../config/constants');
const userRolesEnum = require('../config/users-roles.enum');

const girlValidator = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().min(18).max(100)
});

// модель та валідатор повинні співпадати
// в даному випадку лишні вимоги для прикладу Joi
const createUserValidator = Joi.object({
  //  вимоги, стрінга, містить лише  a-z, A-Z, and 0-9., мін там макс символів, обов'язковий
  name: Joi.string().alphanum().min(2).max(30).required().trim(),

  // мило і пароль стрінга і одразу перевіряється по регулярному виразу
  email: Joi.string().lowercase().regex(EMAIL_REGEXP).required(),
  password: Joi.string().regex(PASSWORD_REGEXP).required(),

  // вік, де CURRENT_YEAR, це поточний рік відповідно від 6 до 120 років
  born_year: Joi.number().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 6),

  //  allow - дозволити лише деякі значення
  // ставимо ... щоб був масив, якщо без, то буде через кому значення
  role: Joi.string().allow(...Object.values(userRolesEnum)),

  // інші можливості Joi

  // наявність car просто ао так або ні
  car: Joi.boolean(),

  // посилання на валідатор дівчат
  // щоб уникнути вкладеності виносимо в окрему змінну
  girl: Joi.array()
    .items(girlValidator)

  // when - якщо значення співпадає, допиши наступні щзначення
  // car - посилання на поле car, is: true - умова, якщо співпадає тоді
  // then: Joi.required() - виконай цю умову(girl стає обов'язковим)
    .when('car', { is: true, then: Joi.required() })
});

// при update юзера повинен бути окрмий валідатор
// інша логіка
const updateUserValidator = Joi.object({
  // поле required() не потрібне, оскільки ми,як юзер, можемо і не оновлювати пароль чи мило
  name: Joi.string().alphanum().min(2).max(30),
  email: Joi.string().regex(EMAIL_REGEXP)
  // password: Joi.string().regex(PASSWORD_REGEXP).required(), // кидати пароль на фронт велике секіюріті gap
  // role: Joi.string().allow(...Object.values(userRolesEnum)), // змінює лише адмін юзер цього не робить

});

module.exports = {
  createUserValidator,
  updateUserValidator
};
