const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');

const orderRouter = require('./routes/orderRouter');
const ingredientsRouter = require('./routes/ingredientRouter');
const authRouter = require('./routes/authRouter');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(compression());
app.use(cors());
app.options('*', cors());

app.use(express.json({ limit: '10kb' }));

app.use('/api/v1', authRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/ingredients', ingredientsRouter);

app.use(globalErrorHandler);

module.exports = app;
