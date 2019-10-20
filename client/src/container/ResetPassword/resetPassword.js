import React, { Component } from 'react';
import { Col, Row, Form, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FormType from '../../Components/Forms/Form';
import styles from './resetPassword.module.css';
import Button from '../../Components/Buttons/Button';
import * as actions from '../../store/index';
import disableBtnChecker from '../../Utility/accountBtnDisable';
import PushMessage from '../../Components/PushMessages/PushMessage';

class ResetPasswordType extends Component {
  state = {
    input: {
      password: {
        value: '',
        valid: false,
        className: {},
        showPopOver: false
      },
      passwordConfirm: {
        value: '',
        valid: false,
        className: {},
        showPopOver: false
      }
    },
    show: true
  };

  submitAll = () => {
    let url = window.location.href;
    let password = this.state.input.password.value;
    let token = url.split('/');
    token = token[token.length - 1];

    this.props.onResetPassword(token, password);
  };

  cancelError = () => {
    this.props.errorToFalseAlternate();
  };

  redirectHome = () => {
    this.props.history.push('/');
  };

  validation = event => {
    let style;
    let styleValid;
    let output = event.target.value;

    if (output.length >= 8 && this.state.input.passwordConfirm.value === '') {
      style = styles.valid;
      let int = {
        ...this.state.input,
        password: {
          ...this.state.input.password,
          value: output,
          valid: true,
          className: style,
          showPopOver: false
        }
      };
      this.setState({ input: int });
    } else if (output.length >= 8 && this.state.input.passwordConfirm.value === output) {
      style = styles.valid;
      let int = {
        ...this.state.input,
        password: {
          ...this.state.input.password,
          value: output,
          valid: true,
          className: style,
          showPopOver: false
        },
        passwordConfirm: {
          ...this.state.input.passwordConfirm,
          valid: true,
          className: style,
          showPopOver: false
        }
      };
      this.setState({ input: int });
    } else if (output.length >= 8 && this.state.input.passwordConfirm.value !== output) {
      style = styles.invalid;
      styleValid = styles.valid;
      let int = {
        ...this.state.input,
        password: {
          ...this.state.password,
          value: output,
          valid: true,
          className: styleValid,
          showPopOver: false
        },
        passwordConfirm: {
          ...this.state.input.passwordConfirm,
          valid: false,
          className: style,
          showPopOver: true
        }
      };
      this.setState({ input: int });
    } else if (event.target.value.length <= 8) {
      style = styles.invalid;
      let int = {
        ...this.state.input,
        password: {
          ...this.state.input.password,
          value: output,
          valid: false,
          className: style,
          showPopOver: true
        }
      };
      this.setState({ input: int });
    }
  };

  validateConfirmPassword = event => {
    let style;
    let output = event.target.value;
    if (output === this.state.input.password.value) {
      style = styles.valid;
      let int = {
        ...this.state.input,
        passwordConfirm: {
          ...this.state.input.passwordConfirm,
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
        passwordConfirm: {
          ...this.state.input.passwordConfirm,
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
    let checkBtnDisable = disableBtnChecker(this.state.input);
    let accountPage;

    if (!this.props.resetPwdSuccess && !this.props.resetPwdFail && !this.props.loading) {
      accountPage = (
        <Form as={Col} xs={10} md={5} className={styles.form}>
          <Row className="justify-content-center">
            <FormType
              label="Password"
              name="password"
              className={this.state.input.password.className}
              change={event => this.validation(event)}
              type="password"
              required={true}
              openPopOver={this.state.input.password.showPopOver}
              popOverDetails="Password not strong enough"
            />
            <FormType
              label="Confirm Password"
              name="passwordConfirm"
              className={this.state.input.passwordConfirm.className}
              change={event => this.validateConfirmPassword(event)}
              type="password"
              required={true}
              openPopOver={this.state.input.passwordConfirm.showPopOver}
              popOverDetails="Password does not match"
            />
            <Button
              btnId="submitId"
              className={[styles.btn, 'col-7'].join(' ')}
              disabled={!checkBtnDisable}
              clicked={() => this.submitAll()}
            >
              Change Password
            </Button>
          </Row>
        </Form>
      );
    } else if (this.props.resetPwdSuccess && !this.props.loading) {
      accountPage = (
        <PushMessage
          whenShowPushMessage={this.props.resetPwdSuccess}
          clickPushMessage={this.redirectHome}
          heading="Success"
          body="Password Changed"
        />
      );
    } else if (this.props.resetPwdFail && !this.props.loading) {
      accountPage = (
        <PushMessage
          whenShowPushMessage={this.props.resetPwdFail}
          clickPushMessage={this.cancelError}
          heading="Failed"
          body={this.props.errorMessage}
        />
      );
    } else if (this.props.loading) {
      accountPage = <Spinner className={styles.spinner} animation="border" />;
    }
    return <Row className={'justify-content-center'}>{accountPage}</Row>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.account.loading,
    doneLoading: state.account.doneLoading,
    resetPwdSuccess: state.account.resetPwdSuccess,
    resetPwdFail: state.account.resetPwdFail,
    errorMessage: state.account.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onResetPassword: (token, password) => dispatch(actions.resetPasswordInit(token, password)),
    errorToFalseAlternate: () => dispatch(actions.errorToFalse())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResetPasswordType)
);
