const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
  Bacon: {
    type: Number
  },
  Cheese: {
    type: Number
  },
  Meat: {
    type: Number
  },
  Salad: {
    type: Number
  }
});

const Ingredient = mongoose.model('Ingredient', ingredientsSchema);

// const ingredients = await Ingredients.create({
//   Bacon: 0,
//   Cheese: 0,
//   Meat: 0,
//   Salad: 0
// });

module.exports = Ingredient;
