const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const compression = require('compression');

const orderRouter = require('./routes/orderRouter');
const ingredientsRouter = require('./routes/ingredientRouter');
const authRouter = require('./routes/authRouter');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!'
});
app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(compression());
app.use(cors());
app.options('*', cors());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());
app.use('/api/v1', authRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/ingredients', ingredientsRouter);

app.use(globalErrorHandler);

module.exports = app;
