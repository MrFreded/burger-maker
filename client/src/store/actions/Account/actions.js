import * as actionTypes from '../../actionTypes';
import * as actions from '../../index';
import Axios from './../../../axios-instance';

export const sendingStart = () => {
  return {
    type: actionTypes.WAIT_REPONSE
  };
};

export const signInSuccess = (tokenId, locald) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    token: tokenId,
    id: locald
  };
};
export const signInError = message => {
  return {
    type: actionTypes.SIGN_IN_FAILED,
    errorMessage: message
  };
};

export const signInInnit = (email, password, type) => {
  return dispatch => {
    const details = {
      email,
      password
    };
    dispatch(sendingStart());
    let url;
    if (type === 'signUp') {
      details.passwordConfirm = password;
      url = '/sign-up';
    } else if (type === 'signIn') {
      url = '/login';
    }

    Axios.post(url, details)

      .then(reponse => {
        let now = new Date();
        let expireDate = now.getTime() + +reponse.data.expiresIn * 1000;

        dispatch(signInSuccess(reponse.data.idToken, reponse.data.localId));
        dispatch(checkLogout(+reponse.data.expiresIn * 1000));
        localStorage.setItem('expireDate', expireDate);
        localStorage.setItem('idToken', reponse.data.idToken);
        localStorage.setItem('localId', reponse.data.localId);
      })

      .catch(error => {
        dispatch(signInError(error.response.data.message));
      });
  };
};

const forgetPasswordSuccess = () => {
  return {
    type: actionTypes.FORGOT_PASSWORD_SUCCESS
  };
};

export const forgotPwdError = message => {
  return {
    type: actionTypes.FORGOT_PASSWORD_FAILED,
    errorMessage: message
  };
};

export const forgotPasswordInit = (email, resetURL) => {
  return dispatch => {
    const details = {
      email,
      resetURL
    };

    dispatch(sendingStart());

    Axios.post('/forgot-password', details)

      .then(reponse => {
        dispatch(forgetPasswordSuccess());
      })

      .catch(error => {
        dispatch(forgotPwdError(error.response.data.message));
      });
  };
};

export const resetPasswordSuccess = () => {
  return {
    type: actionTypes.RESET_PASSWORD_SUCCESS
  };
};

export const resetPasswordFail = message => {
  return {
    type: actionTypes.RESET_PASSWORD_FAILED,
    errorMessage: message
  };
};

export const resetPasswordInit = (token, password) => {
  return dispatch => {
    const details = {
      password,
      passwordConfirm: password
    };

    dispatch(sendingStart());

    Axios.post(`/reset-password/${token}`, details)

      .then(reponse => {
        dispatch(resetPasswordSuccess());
      })

      .catch(error => {
        dispatch(resetPasswordFail(error.response.data.message));
      });
  };
};

export const errorToFalse = () => {
  return {
    type: actionTypes.SWITCH_ERROR_FALSE
  };
};

export const checkValidTokenOnReload = () => {
  return dispatch => {
    let now = new Date();
    let nowDate = now.getTime();
    let expireDate = localStorage.expireDate;
    let Id = localStorage.localId;
    let token = localStorage.idToken;

    if (expireDate > nowDate) {
      dispatch(signInSuccess(token, Id));
      dispatch(checkLogout(expireDate - nowDate));
      dispatch(actions.innitfetchOrder(token, Id));
    } else localStorage.clear();
  };
};

export const checkLogout = expireTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(innitLogout());
    }, expireTime);
  };
};
export const innitLogout = () => {
  return {
    type: actionTypes.LOGOUT
  };
};
