import * as actionTypes from '../../actionTypes';
import Axios from './../../../axios-instance';

export const addIngredients = ingName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
  };
};

export const MinusIngredients = ingName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName
  };
};

export const fetchIngreStart = () => {
  return {
    type: actionTypes.START_INGREDIENT_FETCH
  };
};

export const setIngredients = ing => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ing
  };
};

export const fetchIngredientFailed = reason => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
    message: reason
  };
};

export const sendIngredientErrorReset = () => {
  return {
    type: actionTypes.INGREDIENT_FAIL_RESET
  };
};

export const innitIngredients = () => {
  return dispatch => {
    dispatch(fetchIngreStart());

    Axios.get('/ingredients')

      .then(reponse => {
        dispatch(setIngredients(reponse.data.data.ingredients));
      })

      .catch(error => {
        dispatch(fetchIngredientFailed());
      });
  };
};
