const Order = require('./../models/orderModel');

exports.createOrder = async (req, res, next) => {
  const order = await Order.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      order
    }
  });
};

exports.getUserOrder = async (req, res, next) => {
  const order = await Order.find({ refToUser: req.user._id }).select(
    '-__v -_id'
  );
  res.status(200).json({
    status: 'success',
    data: {
      order
    }
  });
};
