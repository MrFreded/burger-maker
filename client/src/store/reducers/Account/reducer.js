import * as actionTypes from '../../actionTypes';

const initialState = {
  token: '',
  id: '',
  isAuth: false,
  loading: false,
  doneLoading: false,
  signInError: false,
  errorMessage: '',
  forgetPwdSuccess: false,
  forgetPwdFailed: false,
  resetPwdSuccess: false,
  resetPwdFail: false
};

const reducerSignIn = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WAIT_REPONSE:
      state = {
        ...state,
        loading: true,
        doneLoading: false,
        forgetPwdSuccess: false,
        forgetPwdFailed: false
      };
      return state;
    case actionTypes.SIGN_IN_SUCCESS:
      state = {
        ...state,
        token: action.token,
        id: action.id,
        isAuth: true,
        loading: false,
        doneLoading: true
      };
      return state;
    case actionTypes.SIGN_IN_FAILED:
      state = {
        ...state,
        signInError: true,
        errorMessage: action.errorMessage,
        loading: false,
        doneLoading: true
      };
      return state;
    case actionTypes.SWITCH_ERROR_FALSE:
      state = {
        ...state,
        signInError: false,
        forgetPwdFailed: false,
        resetPwdFail: false
      };
      return state;

    case actionTypes.FORGOT_PASSWORD_SUCCESS:
      state = {
        ...state,
        loading: false,
        doneLoading: true,
        forgetPwdSuccess: true
      };
      return state;
    case actionTypes.FORGOT_PASSWORD_FAILED:
      state = {
        ...state,
        forgetPwdFailed: true,
        errorMessage: action.errorMessage,
        doneLoading: true,
        loading: false
      };
      return state;
    case actionTypes.RESET_PASSWORD_SUCCESS:
      state = {
        ...state,
        resetPwdSuccess: true,
        loading: false
      };
      return state;
    case actionTypes.RESET_PASSWORD_FAILED:
      state = {
        ...state,
        resetPwdFail: true,
        loading: false,
        errorMessage: action.errorMessage
      };
      return state;
    case actionTypes.LOGOUT:
      state = {
        ...state,
        token: '',
        id: '',
        isAuth: false,
        loading: false,
        doneLoading: false,
        signInError: false,
        errorMessage: '',
        forgetPwdSuccess: false,
        forgetPwdFailed: false,
        resetPwdSuccess: false,
        resetPwdFail: false
      };
      return state;

    default:
      return state;
  }
};

export default reducerSignIn;
