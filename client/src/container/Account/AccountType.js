import React, { useState } from 'react';
import { Col, Row, Form, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import validator from 'validator';

import FormType from '../../Components/Forms/Form';
import styles from './AccountType.module.css';
import Button from '../../Components/Buttons/Button';
import * as actions from '../../store/index';
import burgerChecker from '../../Utility/emptyBurgerChecker';
import disableBtnChecker from '../../Utility/accountBtnDisable';
import customValidator from '../../hooks/customValidator';

const AccountType = props => {
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});

  const submitAll = () => {
    props.onSignUp(email.value, password.value, props.type);
    setEmail({
      ...email,
      value: '',
      valid: false,
      className: {},
      showPopOver: false
    });
    setPassword({
      ...password,
      value: '',
      valid: false,
      className: {},
      showPopOver: false
    });
  };

  const validation = (name, event) => {
    let style;
    let output = event.target.value;
    let int;

    switch (name) {
      case 'email':
        if (validator.isEmail(output)) {
          style = styles.valid;
          int = customValidator('valid', name, style, output);
          setEmail(int);
        } else {
          style = styles.invalid;
          int = customValidator('invalid', name, style);
          setEmail(int);
        }
        break;
      case 'password':
        if (output.length >= 8) {
          style = styles.valid;
          int = customValidator('valid', name, style, output);
          setPassword(int);
        } else {
          style = styles.invalid;
          int = customValidator('invalid', name, style);
          setPassword(int);
        }
        break;
      default:
        return null;
    }
  };

  let accountPage;
  let checkEmptyBurger = burgerChecker(props.ing);
  let checkBtnDisable = disableBtnChecker({ email, password });

  if (!props.loading && !props.Auth) {
    accountPage = (
      <Form as={Col} xs={10} md={5}>
        <Row className="justify-content-center">
          <h6>{props.errorMessage}</h6>

          <FormType
            label="Email"
            name="email"
            className={email.className}
            change={event => validation('email', event)}
            type="email"
            required={true}
            openPopOver={email.showPopOver}
            popOverDetails="Please check field"
          />

          <FormType
            label="Password"
            name="password"
            className={password.className}
            change={event => validation('password', event)}
            type="password"
            required={true}
            openPopOver={password.showPopOver}
            popOverDetails="Please field is required"
          />

          <Button
            className={[styles.btn, 'col-7'].join(' ')}
            disabled={!checkBtnDisable}
            clicked={() => submitAll()}
          >
            {props.action}
          </Button>

          <Button clicked={props.handler} className={[styles.btnSignUp, 'col-7'].join(' ')}>
            {props.alternative}
          </Button>

          <Button
            clicked={props.forgotPasswordPropsHandler}
            className={[styles.btnSignUp, 'col-7'].join(' ')}
          >
            {props.activateForgotPassword}
          </Button>
        </Row>
      </Form>
    );
  } else if (props.loading && !props.doneLoading) {
    accountPage = <Spinner className={styles.spinner} animation="border" />;
  } else if (props.doneLoading && !checkEmptyBurger && props.Auth) {
    accountPage = <Redirect to="/checkout" />;
  } else if (props.doneLoading && checkEmptyBurger && props.Auth) {
    accountPage = <Redirect to="/" />;
  }

  return <Row className={'justify-content-center'}>{accountPage}</Row>;
};

const mapStateToProps = state => {
  return {
    loading: state.account.loading,
    doneLoading: state.account.doneLoading,
    ing: state.burger.ingredients,
    error: state.account.signInError,
    Auth: state.account.isAuth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (email, pwd, type) => dispatch(actions.signInInnit(email, pwd, type))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountType);
