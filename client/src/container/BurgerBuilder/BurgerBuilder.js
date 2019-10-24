import React, { useState, useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

import Burger from '../../Components/Burger/Burger';
import BurgerControls from '../../Components/BurgerControls/BurgerControls';
import OrderNow from '../../Components/OrderNow/OrderNow';
import BackDrop from '../../UI/Backdrop/Backdrop';
import * as actions from '../../store/index';
import checker from '../../Utility/disableChecker';
import styles from './BurgerBuilder.module.css';
import PushMessage from '../../Components/PushMessages/PushMessage';

const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(null);
  const { onsetIngredient, onReload } = props;
  // state = {
  //   purchasing: false
  // };

  const retry = () => {
    props.resetIngreError();
    props.onsetIngredient();
  };
  const orderNowHandler = () => {
    setPurchasing(true);
  };

  const hideBackDropHandler = () => {
    setPurchasing(false);
  };

  const sendOrderHandler = () => {
    setPurchasing(false);
    if (props.Auth) {
      props.history.push('/checkout');
    } else {
      props.history.push('/account');
    }
  };
  useEffect(() => {
    onsetIngredient();
    onReload();
  }, [onsetIngredient, onReload]);

  let checkerDisable = checker(props.ing);
  let burgerPage;
  if (props.onStartApp && !props.error) {
    burgerPage = (
      <Col xs={12}>
        <Burger updatedIngredients={props.ing} />
        <BurgerControls
          disabled={checkerDisable}
          ingredients={props.ing}
          addMoreBtn={props.onIngredientAdded}
          reduceBtn={props.onIngredientRemoved}
          price={props.totalPrice}
          orderNowBtn={orderNowHandler}
        />
        <OrderNow
          checkOutIngredients={props.ing}
          checkOutPrice={props.totalPrice}
          checkPurchasing={purchasing}
          cancelCheckout={hideBackDropHandler}
          continueCheckout={sendOrderHandler}
        />
        <BackDrop showBackDrop={purchasing} clicked={hideBackDropHandler} />
      </Col>
    );
  } else if (!props.onStartApp && !props.error & props.onStartFetch) {
    burgerPage = <Spinner className={styles.spinner} animation="border" />;
  } else if (props.error) {
    burgerPage = (
      <PushMessage
        whenShowPushMessage={props.error}
        clickPushMessage={retry}
        heading="Error"
        body={props.fetchFailMes}
        btnStyle="failBtn"
        action="Try again"
      />
    );
  }
  return <Row className="justify-content-center">{burgerPage}</Row>;
};

const mapStateToProps = state => {
  return {
    ing: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    onStartApp: state.burger.startApp,
    Auth: state.account.isAuth,
    error: state.burger.error,
    fetchFailMes: state.burger.fetchFailReason,
    onStartFetch: state.burger.startFetch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredients(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.MinusIngredients(ingName)),
    onsetIngredient: () => dispatch(actions.innitIngredients()),
    onReload: () => dispatch(actions.checkValidTokenOnReload()),
    resetIngreError: () => dispatch(actions.sendIngredientErrorReset())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BurgerBuilder);
