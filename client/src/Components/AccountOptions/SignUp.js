import React from 'react';
import { Col } from 'react-bootstrap';

import AccountType from '../../container/Account/AccountType';

const SignUp = props => {
  return (
    <Col md={12} xs={12} className="justify-content-center">
      <AccountType
        type="signUp"
        action="Create Account"
        alternative="Already have an account? sign in"
        activateForgotPassword="Forgot Password?"
        handler={props.alternateHandler}
        forgotPasswordPropsHandler={props.passForgotPassword}
        errorMessage={props.errorDisplay}
      />
    </Col>
  );
};

export default SignUp;
