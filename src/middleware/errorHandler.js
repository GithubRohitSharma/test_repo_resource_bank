const logger = require('../utils/logger');

function notFound(req, res, next) {
  res.status(404);
  return res.render('404.hbs');
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  logger.error(err.message || 'Server error');
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  return res.render('500');
}

module.exports = { notFound, errorHandler };


