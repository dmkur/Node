const Joi = require('joi');

const { EMAIL_REGEXP, PASSWORD_REGEXP, CURRENT_YEAR } = require('../configs/regExp/constants');
const userRolesEnum = require('../configs/user-roles-enum');

const createUserValidator = Joi.object({
  name: Joi.string().lowercase().trim().min(3).max(30).required(),
  email: Joi.string().lowercase().trim().regex(EMAIL_REGEXP).required(),
  password: Joi.string().trim().regex(PASSWORD_REGEXP).required(),
  born_year: Joi.number().max(CURRENT_YEAR - 7).min(CURRENT_YEAR - 120),
  role: Joi.string().allow(...Object.values(userRolesEnum))
});

module.exports = {
  createUserValidator
};
