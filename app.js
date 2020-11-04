const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

app.use(cors());

const AppError = require('./utils/appError');
const errorHandlerController = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

process.env.NODE_ENV === 'development' ? app.use(morgan('dev')) : '';
const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request. Please try again in an hour!',
});
app.use('/api', limiter);
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandlerController);

module.exports = app;
