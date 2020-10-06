const AppError = require('../utils/appError');

handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

handleDuplicateKeyErrorDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Use unique value`;
  return new AppError(message, 400);
};

sendErrorDev = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

sendErrorProd = (res, err) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: 500,
      message: 'Something went wrong(Internal Server Error)',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(res, err);
  } else if (process.env.NODE_ENV.trim() === 'production') {
    let error = Object.assign({}, err, { message: err.message });
    if (error.kind === 'ObjectId') error = handleCastErrorDB(err);
    if (error.code === 11000) error = handleDuplicateKeyErrorDB(err);
    if (error._message === 'Validation failed')
      error = new AppError(error.message, 400);
    sendErrorProd(res, error);
  }

  next();
};
