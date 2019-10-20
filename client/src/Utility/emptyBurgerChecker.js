const emptyBurger = ing => {
  let empty;
  let Ingredients = [];
  Object.keys(ing).forEach(key => {
    Ingredients = [
      ...Ingredients,
      ...(key + ' ')
        .repeat(ing[key])
        .trim()
        .split(' ')
    ];
  });
  Ingredients = Ingredients.filter(key => {
    return key !== '';
  });
  if (Ingredients.length === 0) {
    empty = true;
  } else empty = false;
  return empty;
};

export default emptyBurger;
