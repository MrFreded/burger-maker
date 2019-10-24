import React, { useState, useCallback } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Burger from '../../Components/Burger/Burger';
import SignUp from '../../Components/AccountOptions/SignUp';
import SignIn from '../../Components/AccountOptions/SignIn';
import * as actions from '../../store/index';

const Account = props => {
  const [signIn, setSignIn] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  // state = {
  //   signIn: true,
  //   forgotPassword: false
  // };
  const signUpHandler = () => {
    setSignIn(previousState => !previousState);
    setForgotPassword(false);
    props.errorToFalseAlternate();
  };
  const forgotPasswordHandler = useCallback(() => {
    setForgotPassword(true);
  }, []);

  let showAccount;
  let message;
  if (props.error && props.done) {
    message = (
      <span xs={12}>
        <h6 className="text-center">{props.errorMes}</h6>
      </span>
    );
  }
  if (!signIn && !forgotPassword) {
    showAccount = (
      <Col md={12} xs={12}>
        <Burger updatedIngredients={props.ing} />
        <SignIn
          alternateHandler={signUpHandler}
          passForgotPassword={forgotPasswordHandler}
          errorDisplay={message}
        />
      </Col>
    );
  } else if (signIn && !forgotPassword) {
    showAccount = (
      <Col md={12} xs={12}>
        <Burger updatedIngredients={props.ing} />
        <SignUp
          alternateHandler={signUpHandler}
          passForgotPassword={forgotPasswordHandler}
          errorDisplay={message}
        />
      </Col>
    );
  } else if (forgotPassword) {
    showAccount = <Redirect to="/forgot-password" />;
  }

  return <Row className="justify-content-center">{showAccount}</Row>;
};

const mapStateToProps = state => {
  return {
    ing: state.burger.ingredients,
    error: state.account.signInError,
    done: state.account.doneLoading,
    errorMes: state.account.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    errorToFalseAlternate: () => dispatch(actions.errorToFalse())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
