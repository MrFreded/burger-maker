const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'kindly enter your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, ' kindly input your email'],
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'kindly input your password'],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'kindly confirm password'],
    validate: {
      validator: function(val) {
        return this.password === val;
      },
      message: 'Password does not match'
    }
  },
  passwordChangedAt: Date,
  passwordChangeToken: {
    type: String
  },
  changePasswordTokenExpiresIn: {
    type: Date
  }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
  } else return next();
});
userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
    return next();
  } else return next();
});
userSchema.methods.comparePassword = async function(reqPassword, dbPassword) {
  return await bcrypt.compare(reqPassword, dbPassword);
};

userSchema.methods.passwordChangedAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    // let JWTTime = new Date();
    // JWTTime.setTime(JWTTimestamp * 1000);
    let JWTTime = JWTTimestamp * 1000;
    return JWTTime < this.passwordChangedAt;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordChangeToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.changePasswordTokenExpiresIn = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
