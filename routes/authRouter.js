const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');

router.route('/sign-up').post(authController.signUp);
router.route('/login').post(authController.logIn);

router.route('/forgot-password').post(authController.forgotPassword);
router.route('/reset-password/:token').post(authController.resetPassword);

module.exports = router;
