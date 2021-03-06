const ErrorHandler = require('../errors/ErrorHandler');
const { PHOTO_MAX_SIZE, MIMETYPES } = require('../config/constants');

module.exports = {
  checkAvatar: (req, res, next) => {
    try {
      if (!req.files || !req.files.avatar) {
        next();
        return;
      }

      const { size, mimetype, name } = req.files.avatar;

      if (size > PHOTO_MAX_SIZE) {
        throw new ErrorHandler(400, `File ${name} is too big`);
      }

      if (!MIMETYPES.PHOTO.includes(mimetype)) {
        throw new ErrorHandler(400, `Wrong format file - ${name}`);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
