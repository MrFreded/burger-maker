import React, { useState } from 'react';
import { Col, Row, Form, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import validator from 'validator';

import FormType from '../../Components/Forms/Form';
import styles from './AccountType.module.css';
import Button from '../../Components/Buttons/Button';
import * as actions from '../../store/index';
import PushMessage from '../../Components/PushMessages/PushMessage';
import customValidator from '../../hooks/customValidator';

const ResetPasswordType = props => {
  const [email, setEmail] = useState({});
  const [doneForgotPwd, setDoneForgotPwd] = useState(null);

  const redirectHome = () => {
    setDoneForgotPwd(false);
    props.history.push('/');
  };

  const cancelError = () => {
    const style = {};
    const output = '';
    const int = customValidator('invalid', email, style, output);
    setEmail(int);
    setDoneForgotPwd(false);
    props.errorToFalseAlternate();
  };

  const submitAll = () => {
    setDoneForgotPwd(true);
    let resetURL = window.location.origin;
    let emailValue = email.value;
    props.onForgotPassword(emailValue, resetURL);
  };

  const validation = event => {
    let style;
    let output = event.target.value;
    let int;

    if (validator.isEmail(output)) {
      style = styles.valid;
      int = customValidator('valid', email, style, output);

      setEmail(int);
    } else {
      style = styles.invalid;
      int = customValidator('invalid', email, style, output);

      setEmail(int);
    }
  };

  let accountPage;
  let checkBtnDisable = email.valid;

  if (!props.loading && !doneForgotPwd && !props.changePwdFailed) {
    accountPage = (
      <Form as={Col} xs={10} md={5} className={styles.forgotPwd}>
        <Row className="justify-content-center">
          <FormType
            label="Email"
            name="email"
            className={email.className}
            change={event => validation(event)}
            type="email"
            required={true}
            openPopOver={email.showPopOver}
            popOverDetails="Invalid email type"
          />

          <Button
            className={[styles.btn, 'col-7'].join(' ')}
            disabled={!checkBtnDisable}
            clicked={() => submitAll()}
          >
            {props.action}
          </Button>
        </Row>
      </Form>
    );
  } else if (props.loading && !props.doneLoading) {
    accountPage = <Spinner className={styles.spinner} animation="border" />;
  } else if (!props.loading && props.doneLoading && !props.changePwdFailed) {
    accountPage = (
      <PushMessage
        whenShowPushMessage={props.changePwdSucces}
        clickPushMessage={redirectHome}
        heading="success"
        body="passord reset link sent to email"
      />
    );
  } else if (props.changePwdFailed) {
    accountPage = (
      <PushMessage
        whenShowPushMessage={props.changePwdFailed}
        clickPushMessage={cancelError}
        heading="Error"
        body={props.errorMes}
      />
    );
  }

  return <Row className={'justify-content-center'}>{accountPage}</Row>;
};

const mapStateToProps = state => {
  return {
    loading: state.account.loading,
    doneLoading: state.account.doneLoading,
    changePwdSucces: state.account.forgetPwdSuccess,
    changePwdFailed: state.account.forgetPwdFailed,
    errorMes: state.account.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onForgotPassword: (email, resetURL) => dispatch(actions.forgotPasswordInit(email, resetURL)),
    errorToFalseAlternate: () => dispatch(actions.errorToFalse())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResetPasswordType)
);
