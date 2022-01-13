const jwt = require('jsonwebtoken');
const util = require('util');
const ErrorHandler = require('../errors/ErrorHandler');

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require('../config/variable');

const verifyPromise = util.promisify(jwt.verify);

module.exports = {
  generateTokenPair: () => {
    const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '1d' });
    const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '7d' });

    return {
      access_token,
      refresh_token
    };
  },
  verifyToken: async (token, tokenType = 'access') => {
    try {
      const secretWord = tokenType === 'access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

      await verifyPromise(token, secretWord);
    } catch (e) {
      throw new ErrorHandler(401, 'Invalid signature');
    }
  }
};
