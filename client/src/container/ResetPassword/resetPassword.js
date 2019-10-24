import React, { useState } from 'react';
import { Col, Row, Form, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FormType from '../../Components/Forms/Form';
import styles from './resetPassword.module.css';
import Button from '../../Components/Buttons/Button';
import * as actions from '../../store/index';
import disableBtnChecker from '../../Utility/accountBtnDisable';
import PushMessage from '../../Components/PushMessages/PushMessage';
import customValidator from '../../hooks/customValidator';

const ResetPasswordType = props => {
  const [password, setPassword] = useState({});
  const [passwordConfirm, setPasswordConfirm] = useState({});

  const submitAll = () => {
    let url = window.location.href;
    let passwordValue = password.value;
    let token = url.split('/');
    token = token[token.length - 1];

    props.onResetPassword(token, passwordValue);
  };

  const cancelError = () => {
    props.errorToFalseAlternate();
  };

  const redirectHome = () => {
    props.history.push('/');
  };

  const validation = event => {
    let style;
    let styleValid;
    let output = event.target.value;
    let int;
    let intConfirm;

    if (output.length >= 8 && passwordConfirm.value === '') {
      style = styles.valid;
      int = customValidator('valid', password, style, output);

      setPassword(int);
    } else if (output.length >= 8 && passwordConfirm.value === output) {
      style = styles.valid;
      int = customValidator('valid', password, style, output);
      intConfirm = customValidator('valid', passwordConfirm, style, output);

      setPassword(int);
      setPasswordConfirm(intConfirm);
    } else if (output.length >= 8 && passwordConfirm.value !== output) {
      style = styles.invalid;
      styleValid = styles.valid;
      int = customValidator('valid', password, styleValid, output);
      intConfirm = customValidator('invalid', passwordConfirm, style, output);

      setPassword(int);
      setPasswordConfirm(intConfirm);
    } else if (event.target.value.length <= 8) {
      style = styles.invalid;
      int = customValidator('invalid', password, style, output);

      setPassword(int);
    }
  };

  const validateConfirmPassword = event => {
    let style;
    let int;
    let output = event.target.value;
    if (output === password.value) {
      style = styles.valid;
      int = customValidator('valid', passwordConfirm, style, output);

      setPasswordConfirm(int);
    } else {
      style = styles.invalid;
      int = customValidator('invalid', passwordConfirm, style, output);
      setPasswordConfirm(int);
    }
  };

  let checkBtnDisable = disableBtnChecker({ password, passwordConfirm });
  let accountPage;

  if (!props.resetPwdSuccess && !props.resetPwdFail && !props.loading) {
    accountPage = (
      <Form as={Col} xs={10} md={5} className={styles.form}>
        <Row className="justify-content-center">
          <FormType
            label="Password"
            name="password"
            className={password.className}
            change={event => validation(event)}
            type="password"
            required={true}
            openPopOver={password.showPopOver}
            popOverDetails="Password not strong enough"
          />
          <FormType
            label="Confirm Password"
            name="passwordConfirm"
            className={passwordConfirm.className}
            change={event => validateConfirmPassword(event)}
            type="password"
            required={true}
            openPopOver={passwordConfirm.showPopOver}
            popOverDetails="Password does not match"
          />
          <Button
            btnId="submitId"
            className={[styles.btn, 'col-7'].join(' ')}
            disabled={!checkBtnDisable}
            clicked={() => submitAll()}
          >
            Change Password
          </Button>
        </Row>
      </Form>
    );
  } else if (props.resetPwdSuccess && !props.loading) {
    accountPage = (
      <PushMessage
        whenShowPushMessage={props.resetPwdSuccess}
        clickPushMessage={redirectHome}
        heading="Success"
        body="Password Changed"
      />
    );
  } else if (props.resetPwdFail && !props.loading) {
    accountPage = (
      <PushMessage
        whenShowPushMessage={props.resetPwdFail}
        clickPushMessage={cancelError}
        heading="Failed"
        body={props.errorMessage}
      />
    );
  } else if (props.loading) {
    accountPage = <Spinner className={styles.spinner} animation="border" />;
  }
  return <Row className={'justify-content-center'}>{accountPage}</Row>;
};

const mapStateToProps = state => {
  return {
    loading: state.account.loading,
    doneLoading: state.account.doneLoading,
    resetPwdSuccess: state.account.resetPwdSuccess,
    resetPwdFail: state.account.resetPwdFail,
    errorMessage: state.account.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onResetPassword: (token, password) => dispatch(actions.resetPasswordInit(token, password)),
    errorToFalseAlternate: () => dispatch(actions.errorToFalse())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResetPasswordType)
);
