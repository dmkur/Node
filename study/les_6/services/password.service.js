const bcrypt = require('bcrypt');
const CustomError = require('../errors/CustomError');

module.exports = {
  hashPassword: (password) => bcrypt.hash(password, 10),
  compare: async (hashPassword, password) => {
    const comparedPassword = await bcrypt.compare(password, hashPassword);

    if (!comparedPassword) {
      throw new CustomError(400, 'Email or password is wrong');
    }
  }
};
