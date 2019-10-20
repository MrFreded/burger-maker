const express = require('express');
const router = express.Router();

const ingredientsController = require('./../controllers/ingredientsController');

router.route('/').get(ingredientsController.setIngredients);

module.exports = router;
