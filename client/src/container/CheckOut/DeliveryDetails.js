import React, { useState } from 'react';
import { Col, Row, Form, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import validator from 'validator';

import FormType from '../../Components/Forms/Form';
import SelectType from '../../Components/Forms/Select';
import styles from './CheckOut.module.css';
import Button from '../../Components/Buttons/Button';
import * as actions from '../../store/index';
import disableBtnChecker from '../../Utility/accountBtnDisable';
import emptyBurger from '../../Utility/emptyBurgerChecker';
import PushMessage from '../../Components/PushMessages/PushMessage';

const CheckOut = props => {
  const [fullName, setFullName] = useState({});
  const [street, setStreet] = useState({});
  const [postalCode, setPostalCode] = useState({});

  const validation = (name, event) => {
    let style;
    let output = event.target.value;

    switch (name) {
      case 'fullName':
        if (output.length >= 5) {
          style = styles.valid;
          let int = {
            ...fullName,
            value: output,
            valid: true,
            className: style
          };
          setFullName(int);
        } else {
          style = styles.invalid;
          let int = {
            ...fullName,
            valid: false,
            className: style
          };
          setFullName(int);
        }
        return;
      case 'street':
        if (output.length > 2) {
          style = styles.valid;
          let int = {
            ...street,
            value: output,
            valid: true,
            className: style
          };
          setStreet(int);
        } else {
          style = styles.invalid;
          let int = {
            ...street,
            valid: false,
            className: style
          };
          setStreet(int);
        }
        break;
      case 'postalCode':
        if (validator.isNumeric(output) || event.target.value.length >= 3) {
          style = styles.valid;
          let int = {
            ...postalCode,
            value: output,
            valid: true,
            className: style
          };
          setPostalCode(int);
        } else {
          style = styles.invalid;
          let int = {
            ...postalCode,
            valid: false,
            className: style
          };
          setPostalCode(int);
        }
        break;
      default:
        return null;
    }
  };

  const submitAll = () => {
    const orderData = {
      name: fullName.value,
      date: new Date(),
      ingredients: props.state.burger.ingredients,
      totalPrice: props.state.burger.totalPrice,
      contactDetails: street.value + ' ' + postalCode.value,
      refToUser: props.state.account.id
    };
    props.onFullOrder(orderData, props.state.account.token);
  };
  const redirectHomeOnClick = () => {
    props.onOrderReset();
    props.history.push('/orders');
  };

  let deliveryPage;
  let checkBtnDisable;
  let pushMessageAlert;
  let inputValidity = disableBtnChecker({ fullName, street, postalCode });
  if (inputValidity && props.Auth && !emptyBurger(props.ing)) checkBtnDisable = false;
  else checkBtnDisable = true;

  if (props.onOrderEnd && !props.onNotSub) {
    pushMessageAlert = (
      <PushMessage
        whenShowPushMessage={props.onOrderEnd && !props.onNotSub}
        clickPushMessage={redirectHomeOnClick}
        heading="Order Placed"
        body="We hope you enjoy your burger"
        btnStyle="successBtn"
        action=" Ok"
      />
    );
  } else if (props.onOrderError && !props.onNotSub) {
    pushMessageAlert = (
      <PushMessage
        whenShowPushMessage={props.onOrderError && !props.onNotSub}
        clickPushMessage={redirectHomeOnClick}
        heading="Error"
        body="Kindly rebuild your burger and re-order"
        btnStyle="failBtn"
        action="Ok"
      />
    );
  }

  if (!props.onOrderStart && !props.onOrderEnd && props.onNotSub && !props.onOrderError) {
    deliveryPage = (
      <Form as={Col} xs={10} md={5}>
        <Row className="justify-content-center">
          <h4>kindly provide delivery details....</h4>
          <FormType
            label="Full name"
            name="fullName"
            className={fullName.className}
            change={event => validation('fullName', event)}
            type="text"
            required={true}
          />

          <FormType
            label="Street"
            name="street"
            className={street.className}
            change={event => validation('street', event)}
            type="text"
            required={true}
          />

          <FormType
            label="Postal Code"
            name="postalCode"
            className={postalCode.className}
            change={event => validation('postalCode', event)}
            type="number"
            required={true}
          />
          <SelectType
            label="Delivery mode"
            option1="......."
            option2="Fastest"
            option3="Cheapest"
          />
          {!props.Auth && inputValidity && <h6>Kindly login or create account</h6>}

          <Button
            className={[styles.btn, 'col-7'].join(' ')}
            disabled={checkBtnDisable}
            clicked={() => submitAll()}
          >
            Send
          </Button>
        </Row>
      </Form>
    );
  } else if (props.onOrderStart && !props.onOrderEnd && !props.onNotSub && !props.onOrderError) {
    deliveryPage = <Spinner className={styles.spinner} animation="border" />;
  }
  return (
    <Row className={'justify-content-center'}>
      {deliveryPage}
      {pushMessageAlert}
    </Row>
  );
};
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
