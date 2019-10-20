const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter your name'],
    trim: true
  },
  contactDetails: {
    type: String,
    trim: true
  },
  ingredients: {
    type: Object
  },
  totalPrice: Number,
  date: Date,
  deliveryMode: {
    type: String,
    enum: {
      values: ['cheapest', 'fastest'],
      message: 'delivery mode can only be cheapest or fastest'
    }
  },
  refToUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    select: false
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
