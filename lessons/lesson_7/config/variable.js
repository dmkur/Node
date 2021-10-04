module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/node-dmkur-2021',

    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'Secret',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'S_2',
};
