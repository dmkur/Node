const { Schema, model } = require('mongoose');

const { userRolesEnum } = require('../confg');

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: userRolesEnum.USERUSER,
    enum: Object.values(userRolesEnum)
  }
});

module.exports = model('user-model', userSchema);
