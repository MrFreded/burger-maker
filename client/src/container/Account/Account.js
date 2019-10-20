import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Burger from '../../Components/Burger/Burger';
import SignUp from '../../Components/AccountOptions/SignUp';
import SignIn from '../../Components/AccountOptions/SignIn';
import * as actions from '../../store/index';

class Account extends Component {
  state = {
    signIn: true,
    forgotPassword: false
  };
  SignUpHandler = () => {
    let sign = !this.state.signIn;
    this.setState({ signIn: sign, forgotPassword: false });
    this.props.errorToFalseAlternate();
  };
  forgotPasswordHandler = () => {
    this.setState({ forgotPassword: true });
  };

  render() {
    let showAccount;
    let message;
    if (this.props.error && this.props.done) {
      message = (
        <span xs={12}>
          <h6 className="text-center">{this.props.errorMes}</h6>
        </span>
      );
    }
    if (!this.state.signIn && !this.state.forgotPassword) {
      showAccount = (
        <Col md={12} xs={12}>
          <Burger updatedIngredients={this.props.ing} />
          <SignIn
            alternateHandler={this.SignUpHandler}
            passForgotPassword={this.forgotPasswordHandler}
            errorDisplay={message}
          />
        </Col>
      );
    } else if (this.state.signIn && !this.state.forgotPassword) {
      showAccount = (
        <Col md={12} xs={12}>
          <Burger updatedIngredients={this.props.ing} />
          <SignUp
            alternateHandler={this.SignUpHandler}
            passForgotPassword={this.forgotPasswordHandler}
            errorDisplay={message}
          />
        </Col>
      );
    } else if (this.state.forgotPassword) {
      showAccount = <Redirect to="/forgot-password" />;
    }

    return <Row className="justify-content-center">{showAccount}</Row>;
  }
}

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
