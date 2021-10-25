const jwt = require('jsonwebtoken');
const util = require('util');
const ErrorHandler = require('../errors/ErrorHandler');

const { actonTokensEnum, variables } = require('../config');

const { ACCESS_SECRET_KEY, FORGOT_PASS_SECRET_KEY, REFRESH_SECRET_KEY } = variables;

const verifyPromise = util.promisify(jwt.verify);

module.exports = {
  generateTokenPair: () => {
    const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
    const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '60m' });

    return {
      access_token,
      refresh_token
    };
  },

  verifyToken: async (token, tokenType = 'access') => {
    try {
      const secret = tokenType === 'access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

      // jwt.verify - містить callback ми її промісифікували рядок 6
      // і сюди вже винесли змінну
      await verifyPromise(token, secret);
    } catch (e) {
      throw new ErrorHandler(401, 'Invalid token');
    }
  },

  generateActionToken: (actionType) => {
    const secretWord = _getSecretWordForActionToken(actionType);

    return jwt.sign({}, secretWord, { expiresIn: '7d' });
  },

  verifyActionToken: (token, actionType) => {
    const secretWord = _getSecretWordForActionToken(actionType);

    return jwt.verify(token, secretWord);
  }
};

function _getSecretWordForActionToken(actionType) {
  let secretWord = '';

  switch (actionType) {
    case actonTokensEnum.FORGOT_PASS:
      secretWord = FORGOT_PASS_SECRET_KEY;
      break;
    case 'x2':
      secretWord = 'lol2';
      break;
    default:
      throw new ErrorHandler(500, 'Wrong token type');
  }
  return secretWord;
}
