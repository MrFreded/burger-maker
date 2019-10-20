const Ingredient = require('../models/ingredientModel');

exports.setIngredients = async (req, res, next) => {
  const ingredients = await Ingredient.findById(
    '5d9b4a0b891e918ab40586f6'
  ).select('-_id -__v');
  res.status(200).json({
    status: 'success',
    data: {
      ingredients
    }
  });
};
