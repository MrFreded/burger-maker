const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');

const User = require('../models/userModel');
const AppError = require('../utility/appError');
const catchAsync = require('./../utility/catchAsync');
const sendEmail = require('./../utility/email');

const createToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = createToken(newUser.id);
  newUser.password = undefined;

  res.status(200).json({
    status: 'success',
    idToken: token,
    localId: newUser._id,
    expiresIn: process.env.JWT_EXPIRES_IN.slice(0, -1)
  });
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    next(new AppError('Kindly input your email and password', 401));
  user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password, user.password)))
    next(new AppError('Invalid email and password', 401));

  const token = createToken(user.id);
  user.password = undefined;

  res.status(200).json({
    status: 'success',
    idToken: token,
    localId: user._id,
    expiresIn: process.env.JWT_EXPIRES_IN.slice(0, -1)
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.params.token) {
    token = req.params.token;
  }
  if (!token) return next(new AppError('kindly login or sign up '));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) return next(new AppError('no user with ID', 401));

  if (user.passwordChangedAfter(decoded.iat))
    return next(new AppError('Password was changed recently', 401));

  user.password = undefined;
  req.user = user;

  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('Invalid email', 401));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.body.resetURL}/reset-password/${resetToken}`;
  const message = `password change, expires in 10 mins. click on ${resetURL} to continue`;

  try {
    sendEmail({
      email: user.email,
      subject: 'Change Password in 10 mins',
      message
    });
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email'
    });
  } catch (err) {
    user.passwordChangeToken = undefined;
    user.changePasswordTokenExpiresIn = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError('There was an error in sending mail', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordChangeToken: hashedToken,
    changePasswordTokenExpiresIn: { $gt: Date.now() }
  });

  if (!user) return next(new AppError('Invalid reset token', 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordChangeToken = undefined;
  user.changePasswordTokenExpiresIn = undefined;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Password Changed'
  });
});
