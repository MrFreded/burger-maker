import * as actionTypes from '../../actionTypes';

const initialState = {
  ingredients: {},
  totalPrice: 4.01,
  startApp: false,
  error: false,
  startFetch: false,
  fetchFailReason: ''
};

const price = {
  Bacon: 1.0,
  Cheese: 1.7,
  Meat: 1.8,
  Salad: 0.8
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_INGREDIENT_FETCH:
      return {
        ...state,
        startFetch: true
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: { ...action.ingredients },
        totalPrice: +4.01,
        startApp: true,
        startFetch: false
      };
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return {
        ...state,
        error: true,
        fetchFailReason: action.message,
        startFetch: false
      };
    case actionTypes.INGREDIENT_FAIL_RESET:
      return {
        ...state,
        error: false
      };
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: +(state.totalPrice + price[action.ingredientName]).toFixed(2)
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: +(state.totalPrice - price[action.ingredientName]).toFixed(2)
      };
    default:
      return state;
  }
};

export default reducer;
