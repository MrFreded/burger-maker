import * as actionTypes from '../../actionTypes';
import Axios from '../../../axios-instance';

export const initSendOrder = response => {
  return { type: actionTypes.SEND_FULL_ORDER };
};

export const sendOrderStart = () => {
  return {
    type: actionTypes.START_ORDER_SEND
  };
};

export const sendOrderSuccess = () => {
  return {
    type: actionTypes.SEND_ORDER_SUCCESS
  };
};

export const sendOrderFail = () => {
  return {
    type: actionTypes.SEND_ORDER_FAIL
  };
};

export const orderReset = () => {
  return {
    type: actionTypes.ORDER_RESET
  };
};

export const sendOrder = (orders, token) => {
  return dispatch => {
    dispatch(sendOrderStart());
    Axios.post(`/orders/${token}`, orders)

      .then(response => {
        dispatch(sendOrderSuccess());
      })

      .catch(error => {
        dispatch(sendOrderFail());
      });
  };
};

export const fetchOrderSuccessful = fetchedOrder => {
  return {
    type: actionTypes.FETCH_ORDERS,
    fetchedOrder: fetchedOrder
  };
};

export const innitfetchOrder = (token, userId) => {
  return dispatch => {
    Axios.get(`/orders/${token}`)
      .then(reponse => {
        dispatch(fetchOrderSuccessful(reponse.data.data.order));
      })

      .catch(error => {});
  };
};
