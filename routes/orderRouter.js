const express = require('express');
const router = express.Router();

const orderController = require('./../controllers/ordersController');
const authController = require('./../controllers/authController');

router
  .route('/:token')
  .post(authController.protect, orderController.createOrder)
  .get(authController.protect, orderController.getUserOrder);

module.exports = router;
