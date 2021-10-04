// ліба що створює токени, для авторизація клієнта.
// викор., щоб не юзати паролі
const jwt = require('jsonwebtoken');
const util = require('util');

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require('../config/variable');

const verifyPromise = util.promisify(jwt.verify);

module.exports = {
  // створення токен пари маючи секретне слово
  // access_token - перший токен який надає права на 15m,
  // refresh_token - другий токен який обновляє перший і працює 60m
  generateTokenPair: () => {
    const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
    const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '60m' });

    return {
      access_token,
      refresh_token
    };
  },

  // верифікація токенів
  verifyToken: async (token, tokenType = 'access') => {
    const secret = tokenType === 'access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

    // jwt.verify - містить callback ми її промісифікували рядок 6
    // і сюди вже винесли змінну
    await verifyPromise(token, secret);
  }
};
