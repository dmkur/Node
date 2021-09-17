const { model, Schema } = require('mongoose');

const userRolesEnum = require('../config/userRolesEnum');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  role: {
    type: String,
    default: userRolesEnum.USER,
    enum: Object.values(userRolesEnum)
  }
}, { timestamps: true });

module.exports = model('user', userSchema);
