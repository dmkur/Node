module.exports = {
  PORT: process.env.PORT || 5001,
  MONGO_CONNECT_URL: process.env.DB_Connect || 'mongodb://localhost:27017/study-dmkur'
};
