const bcrypt = require('bcrypt');
const CustomError = require('../errors/CustomError');

module.exports = {
  hashPassword: (password) => bcrypt.hash(password, 10),
  compare: async (hashPassword, password) => {
    const isPasswordMatched = await bcrypt.compare(password, hashPassword);

    if (!isPasswordMatched) {
      throw new CustomError(400, 'Email or password is wrong');
    }
  }
};
