import React from 'react';
import { Col } from 'react-bootstrap';

import AccountType from '../../container/Account/AccountType';

const SignIn = props => {
  return (
    <Col md={12} xs={12} className="justify-content-center">
      <AccountType
        type="signIn"
        action="Login"
        alternative="New user? sign up"
        activateForgotPassword="Forgot Password?"
        handler={props.alternateHandler}
        forgotPasswordPropsHandler={props.passForgotPassword}
        errorMessage={props.errorDisplay}
      />
    </Col>
  );
};

export default SignIn;
