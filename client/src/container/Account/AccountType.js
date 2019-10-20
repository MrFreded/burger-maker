import React, { Component } from 'react';
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

class AccountType extends Component {
  state = {
    input: {
      email: {
        value: '',
        valid: false,
        className: {},
        showPopOver: false
      },
      password: {
        value: '',
        valid: false,
        className: {},
        showPopOver: false
      }
    }
  };

  submitAll = () => {
    this.props.onSignUp(
      this.state.input.email.value,
      this.state.input.password.value,
      this.props.type
    );

    let int = {
      ...this.state.input,
      email: {
        ...this.state.input.email,
        value: '',
        valid: false,
        className: {},
        showPopOver: false
      },
      password: {
        ...this.state.input.password,
        value: '',
        valid: false,
        className: {},
        showPopOver: false
      }
    };
    this.setState({ input: int });
  };

  validation = (name, event) => {
    let style;
    let output = event.target.value;

    switch (name) {
      case 'email':
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
        break;
      case 'password':
        if (event.target.value.length > 8) {
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
        } else {
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
        break;

      default:
        return null;
    }
  };

  render() {
    let accountPage;
    let checkEmptyBurger = burgerChecker(this.props.ing);
    let checkBtnDisable = disableBtnChecker(this.state.input);

    if (!this.props.loading && !this.props.Auth) {
      accountPage = (
        <Form as={Col} xs={10} md={5}>
          <Row className="justify-content-center">
            <h6>{this.props.errorMessage}</h6>

            <FormType
              label="Email"
              name="email"
              className={this.state.input.email.className}
              change={event => this.validation('email', event)}
              type="email"
              required={true}
              openPopOver={this.state.input.email.showPopOver}
              popOverDetails="Please check field"
            />

            <FormType
              label="Password"
              name="password"
              className={this.state.input.password.className}
              change={event => this.validation('password', event)}
              type="password"
              required={true}
              openPopOver={this.state.input.password.showPopOver}
              popOverDetails="Please field is required"
            />

            <Button
              className={[styles.btn, 'col-7'].join(' ')}
              disabled={!checkBtnDisable}
              clicked={() => this.submitAll()}
            >
              {this.props.action}
            </Button>

            <Button clicked={this.props.handler} className={[styles.btnSignUp, 'col-7'].join(' ')}>
              {this.props.alternative}
            </Button>

            <Button
              clicked={this.props.forgotPasswordPropsHandler}
              className={[styles.btnSignUp, 'col-7'].join(' ')}
            >
              {this.props.activateForgotPassword}
            </Button>
          </Row>
        </Form>
      );
    } else if (this.props.loading && !this.props.doneLoading) {
      accountPage = <Spinner className={styles.spinner} animation="border" />;
    } else if (this.props.doneLoading && !checkEmptyBurger && this.props.Auth) {
      accountPage = <Redirect to="/checkout" />;
    } else if (this.props.doneLoading && checkEmptyBurger && this.props.Auth) {
      accountPage = <Redirect to="/" />;
    }

    return <Row className={'justify-content-center'}>{accountPage}</Row>;
  }
}

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
