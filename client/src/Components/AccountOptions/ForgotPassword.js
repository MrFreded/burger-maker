import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import ForgotPasswordTypeType from '../../container/Account/ForgotPasswordType';

class ForgotPassword extends Component {
  render() {
    return (
      <Col md={12} xs={12} className="justify-content-center">
        <ForgotPasswordTypeType
          type="resetPassword"
          action="Forgot Password"
          handler={this.props.alternateHandler}
          errorMessage={this.props.errorDisplay}
        />
      </Col>
    );
  }
}

export default ForgotPassword;
