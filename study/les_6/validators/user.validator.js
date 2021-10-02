const Joi = require('joi');

const { constants } = require('../confg');
const userRolesEnum = require('../confg/userRolesEnum.config');

const createUserValidator = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).trim(),
  email: Joi.string().lowercase().regex(constants.EMAIL_REGEXP).required(),
  password: Joi.string().regex(constants.PASSWORD_REGEXP).required(),
  role: Joi.string().allow(...Object.values(userRolesEnum)),
  born_year: Joi.number().min(constants.CURRENT_YEAR - 120).max(constants.CURRENT_YEAR - 7)

});

module.exports = { createUserValidator };
