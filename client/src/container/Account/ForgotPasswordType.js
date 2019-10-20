import React, { Component } from 'react';
import { Col, Row, Form, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import validator from 'validator';

import FormType from '../../Components/Forms/Form';
import styles from './AccountType.module.css';
import Button from '../../Components/Buttons/Button';
import * as actions from '../../store/index';
import PushMessage from '../../Components/PushMessages/PushMessage';

class ResetPasswordType extends Component {
  state = {
    input: {
      email: {
        value: '',
        valid: false,
        className: {},
        showPopOver: false
      }
    },
    doneForgotPwd: false
  };

  redirectHome = () => {
    this.setState({ doneForgotPwd: false });
    this.props.history.push('/');
  };

  cancelError = () => {
    let int = {
      ...this.state.input,
      email: {
        ...this.state.input.email,
        value: '',
        valid: false,
        className: {},
        showPopOver: false
      }
    };
    this.setState({ input: int });
    this.setState({ doneForgotPwd: false });
    this.props.errorToFalseAlternate();
  };

  submitAll = () => {
    this.setState({ doneForgotPwd: true });
    let resetURL = window.location.origin;
    let email = this.state.input.email.value;
    this.props.onForgotPassword(email, resetURL);
  };

  validation = event => {
    let style;
    let output = event.target.value;

    if (validator.isEmail(output)) {
      style = styles.valid;
      let int = {
        ...this.state.input,
        email: {
          ...this.state.input.email,
          value: output,
          valid: true,
          className: style,
          showPopOver: false
        }
      };
      this.setState({ input: int });
    } else {
      style = styles.invalid;
      let int = {
        ...this.state.input,
        email: {
          ...this.state.input.email,
          value: output,
          valid: false,
          className: style,
          showPopOver: true
        }
      };
      this.setState({ input: int });
    }
  };

  render() {
    let accountPage;
    let checkBtnDisable = this.state.input.email.valid;

    if (!this.props.loading && !this.state.doneForgotPwd && !this.props.changePwdFailed) {
      accountPage = (
        <Form as={Col} xs={10} md={5} className={styles.forgotPwd}>
          <Row className="justify-content-center">
            <FormType
              label="Email"
              name="email"
              className={this.state.input.email.className}
              change={event => this.validation(event)}
              type="email"
              required={true}
              openPopOver={this.state.input.email.showPopOver}
              popOverDetails="Invalid email type"
            />

            <Button
              className={[styles.btn, 'col-7'].join(' ')}
              disabled={!checkBtnDisable}
              clicked={() => this.submitAll()}
            >
              {this.props.action}
            </Button>
          </Row>
        </Form>
      );
    } else if (this.props.loading && !this.props.doneLoading) {
      accountPage = <Spinner className={styles.spinner} animation="border" />;
    } else if (!this.props.loading && this.props.doneLoading && !this.props.changePwdFailed) {
      accountPage = (
        <PushMessage
          whenShowPushMessage={this.props.changePwdSucces}
          clickPushMessage={this.redirectHome}
          heading="success"
          body="passord reset link sent to email"
        />
      );
    } else if (this.props.changePwdFailed) {
      accountPage = (
        <PushMessage
          whenShowPushMessage={this.props.changePwdFailed}
          clickPushMessage={this.cancelError}
          heading="Error"
          body={this.props.errorMes}
        />
      );
    }

    return <Row className={'justify-content-center'}>{accountPage}</Row>;
  }
}

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
