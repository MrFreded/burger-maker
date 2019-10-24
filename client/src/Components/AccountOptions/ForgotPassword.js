import React from 'react';
import { Col } from 'react-bootstrap';
import ForgotPasswordTypeType from '../../container/Account/ForgotPasswordType';

const ForgotPassword = props => {
  return (
    <Col md={12} xs={12} className="justify-content-center">
      <ForgotPasswordTypeType
        type="resetPassword"
        action="Forgot Password"
        handler={props.alternateHandler}
        errorMessage={props.errorDisplay}
      />
    </Col>
  );
};

export default ForgotPassword;
