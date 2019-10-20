import React, { Component } from 'react';
import { Col, Row, Form, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FormType from '../../Components/Forms/Form';
import SelectType from '../../Components/Forms/Select';
import styles from './CheckOut.module.css';
import Button from '../../Components/Buttons/Button';
import * as actions from '../../store/index';
import disableBtnChecker from '../../Utility/accountBtnDisable';
import emptyBurger from '../../Utility/emptyBurgerChecker';
import PushMessage from '../../Components/PushMessages/PushMessage';

class CheckOut extends Component {
  state = {
    input: {
      fullName: {
        value: '',
        valid: false,
        className: {}
      },
      street: {
        value: '',
        valid: false,
        className: {}
      },
      postalCode: {
        value: '',
        valid: false,
        className: {}
      }
    },
    forBackDrop: true
  };

  Validation = (name, event) => {
    let style;
    let filter;
    let output = event.target.value;

    switch (name) {
      case 'fullName':
        if (event.target.value.length >= 10) {
          style = styles.valid;
          let int = {
            ...this.state.input,
            fullName: {
              ...this.state.input.fullName,
              value: output,
              valid: true,
              className: style
            }
          };
          this.setState({ input: int });
        } else {
          style = styles.invalid;
          let int = {
            ...this.state.input,
            fullName: {
              ...this.state.input.fullName,
              value: output,
              valid: false,
              className: style
            }
          };
          this.setState({ input: int });
        }
        return;

      case 'street':
        if (event.target.value.length > 2) {
          style = styles.valid;
          let int = {
            ...this.state.input,
            street: {
              ...this.state.input.street,
              value: output,
              valid: true,
              className: style
            }
          };
          this.setState({ input: int });
        } else {
          style = styles.invalid;
          let int = {
            ...this.state.input,
            street: {
              ...this.state.input.street,
              valid: false,
              className: style
            }
          };
          this.setState({ input: int });
        }
        break;
      case 'postalCode':
        filter = /^\d+$/;
        if (filter.test(event.target.value) || event.target.value.length >= 5) {
          style = styles.valid;
          let int = {
            ...this.state.input,
            postalCode: {
              ...this.state.input.postalCode,
              value: output,
              valid: true,
              className: style
            }
          };
          this.setState({ input: int });
        } else {
          style = styles.invalid;
          let int = {
            ...this.state.input,
            postalCode: {
              ...this.state.input.postalCode,
              valid: false,
              className: style
            }
          };
          this.setState({ input: int });
        }
        break;
      default:
        return this.state.input;
    }
  };
  submitAll = () => {
    const orderData = {
      name: this.state.input.fullName.value,
      date: new Date(),
      ingredients: this.props.state.burger.ingredients,
      totalPrice: this.props.state.burger.totalPrice,
      contactDetails: this.state.input.street.value + ' ' + this.state.input.postalCode.value,
      refToUser: this.props.state.account.id
    };
    // this.props.onCheckOutSignUp(this.state.input);
    this.props.onFullOrder(orderData, this.props.state.account.token);
  };
  redirectHomeOnClick = () => {
    this.props.onOrderReset();
    this.props.history.push('/orders');
  };

  render() {
    let deliveryPage;
    let checkBtnDisable;
    let pushMessageAlert;
    if (disableBtnChecker(this.state.input) && this.props.Auth && !emptyBurger(this.props.ing))
      checkBtnDisable = false;
    else checkBtnDisable = true;

    if (this.props.onOrderEnd && !this.props.onNotSub && this.state.forBackDrop) {
      pushMessageAlert = (
        <PushMessage
          whenShowPushMessage={
            this.props.onOrderEnd && !this.props.onNotSub && this.state.forBackDrop
          }
          clickPushMessage={this.redirectHomeOnClick}
          heading="Order Placed"
          body="We hope you enjoy your burger"
          btnStyle="successBtn"
          action=" Ok"
        />
      );
    } else if (this.props.onOrderError && !this.props.onNotSub && this.state.forBackDrop) {
      pushMessageAlert = (
        <PushMessage
          whenShowPushMessage={
            this.props.onOrderError && !this.props.onNotSub && this.state.forBackDrop
          }
          clickPushMessage={this.redirectHomeOnClick}
          heading="Error"
          body="Kindly rebuild your burger and re-order"
          btnStyle="failBtn"
          action="Ok"
        />
      );
    }

    if (
      !this.props.onOrderStart &&
      !this.propsonOrderEnd &&
      this.props.onNotSub &&
      !this.props.onOrderError
    ) {
      deliveryPage = (
        <Form as={Col} xs={10} md={5}>
          <Row className="justify-content-center">
            <h4>kindly provide delivery details....</h4>
            <FormType
              label="Full name"
              name="fullName"
              className={this.state.input.fullName.className}
              change={event => this.Validation('fullName', event)}
              type="text"
              required={true}
            />

            <FormType
              label="Street"
              name="street"
              className={this.state.input.street.className}
              change={event => this.Validation('street', event)}
              type="text"
              required={true}
            />

            <FormType
              label="Postal Code"
              name="postalCode"
              className={this.state.input.postalCode.className}
              change={event => this.Validation('postalCode', event)}
              type="number"
              required={true}
            />
            <SelectType
              label="Delivery mode"
              option1="......."
              option2="Fastest"
              option3="Cheapest"
            />

            <Button
              className={[styles.btn, 'col-7'].join(' ')}
              disabled={checkBtnDisable}
              clicked={() => this.submitAll()}
            >
              Send
            </Button>
          </Row>
        </Form>
      );
    } else if (
      this.props.onOrderStart &&
      !this.props.onOrderEnd &&
      !this.props.onNotSub &&
      !this.props.onOrderError
    ) {
      deliveryPage = <Spinner className={styles.spinner} animation="border" />;
    }
    return (
      <Row className={'justify-content-center'}>
        {deliveryPage}
        {pushMessageAlert}
      </Row>
    );
  }
}
const mapStateToProps = state => {
  return {
    state: state,
    onOrderStart: state.order.orderStart,
    onOrderEnd: state.order.orderEnd,
    onOrderError: state.order.error,
    onNotSub: state.order.orderNotSub,
    Auth: state.account.isAuth,
    ing: state.burger.ingredients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFullOrder: (orders, u) => dispatch(actions.sendOrder(orders, u)),
    onOrderReset: () => dispatch(actions.orderReset()),
    fetch: (x, y) => dispatch(actions.innitfetchOrder(x, y))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CheckOut)
);
