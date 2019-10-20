import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

import AccountType from '../../container/Account/AccountType';

class SignIn extends Component {
  render() {
    return (
      <Col md={12} xs={12} className="justify-content-center">
        <AccountType
          type="signIn"
          action="Login"
          alternative="New user? sign up"
          activateForgotPassword="Forgot Password?"
          handler={this.props.alternateHandler}
          forgotPasswordPropsHandler={this.props.passForgotPassword}
          errorMessage={this.props.errorDisplay}
        />
      </Col>
    );
  }
}

export default SignIn;
