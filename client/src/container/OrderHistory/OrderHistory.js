import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import HistoryCard from '../../Components/OrderHistoryCard/OrderHistoryCard';
import * as actions from '../../store/index';

const OrderHistory = props => {
  const { onReload, fetch, token } = props;
  useEffect(() => {
    onReload();
    fetch(token);
  }, [onReload, fetch, token]);

  return <HistoryCard checkAuth={props.signInUp.isAuth} order={props.orderArray} />;
};

const mapStateToProps = state => {
  return {
    orderArray: state.order.orderHistoryArray,
    signInUp: state.account,
    token: state.account.token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onReload: () => dispatch(actions.checkValidTokenOnReload()),
    fetch: (token, id) => dispatch(actions.innitfetchOrder(token, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderHistory);
