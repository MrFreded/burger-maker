import React, { Component } from 'react';
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

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  Retry = () => {
    this.props.resetIngreError();
    this.props.onsetIngredient();
  };
  OrderNowHandler = () => {
    this.setState({ purchasing: true });
  };

  HideBackDropHandler = () => {
    this.setState({ purchasing: false });
  };

  SendOrderHandler = () => {
    this.setState({ purchasing: false });
    if (this.props.Auth) {
      this.props.history.push('/checkout');
    } else {
      this.props.history.push('/account');
    }
  };
  componentDidMount() {
    this.props.onsetIngredient();
    this.props.onReload();
  }
  render() {
    let checkerDisable = checker(this.props.ing);

    let burgerPage;
    if (this.props.onStartApp && !this.props.error) {
      burgerPage = (
        <Col xs={12}>
          <Burger updatedIngredients={this.props.ing} />
          <BurgerControls
            disabled={checkerDisable}
            ingredients={this.props.ing}
            addMoreBtn={this.props.onIngredientAdded}
            reduceBtn={this.props.onIngredientRemoved}
            price={this.props.totalPrice}
            orderNowBtn={this.OrderNowHandler}
          />
          <OrderNow
            checkOutIngredients={this.props.ing}
            checkOutPrice={this.props.totalPrice}
            checkPurchasing={this.state.purchasing}
            cancelCheckout={this.HideBackDropHandler}
            continueCheckout={this.SendOrderHandler}
          />
          <BackDrop showBackDrop={this.state.purchasing} clicked={this.HideBackDropHandler} />
        </Col>
      );
    } else if (!this.props.onStartApp && !this.props.error & this.props.onStartFetch) {
      burgerPage = <Spinner className={styles.spinner} animation="border" />;
    } else if (this.props.error) {
      burgerPage = (
        <PushMessage
          whenShowPushMessage={this.props.error}
          clickPushMessage={this.Retry}
          heading="Error"
          body={this.props.fetchFailMes}
          btnStyle="failBtn"
          action="Try again"
        />
      );
    }
    return <Row className="justify-content-center">{burgerPage}</Row>;
  }
}

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
