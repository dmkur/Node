module.exports = {
  _notFoundError: (err, req, res, next) => {
    next({
      status: err.status || 404,
      message: err.message || 'Not found'
    });
  },
  // eslint-disable-next-line no-unused-vars
  _generalErrorCapture: (err, req, res, next) => {
    res
      .status(err.status || 500)
      .json({ message: err.message });
  }
};
