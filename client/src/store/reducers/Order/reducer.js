import * as actionTypes from '../../actionTypes';

const initialState = {
  orderHistoryArray: [],
  orderNotSub: true,
  orderStart: false,
  orderEnd: false,
  error: false
};

const reducerCheckOut = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_ORDER_SEND:
      state = {
        ...state,
        orderStart: true,
        orderNotSub: false
      };
      return state;
    case actionTypes.SEND_ORDER_SUCCESS:
      state = {
        ...state,
        orderStart: false,
        orderEnd: true,
        orderNotSub: false
      };
      return state;
    case actionTypes.SEND_ORDER_FAIL:
      state = {
        ...state,
        error: true,
        orderNotSub: false
      };
      return state;
    case actionTypes.ORDER_RESET:
      state = {
        ...state,
        orderNotSub: true,
        orderStart: false,
        orderEnd: false,
        error: false
      };
      return state;
    case actionTypes.FETCH_ORDERS:
      state = {
        ...state,
        orderHistoryArray: [...action.fetchedOrder]
      };
      return state;
    case actionTypes.LOGOUT:
      state = {
        ...state,
        orderHistoryArray: []
      };
      return state;
    default:
      return state;
  }
};

export default reducerCheckOut;
