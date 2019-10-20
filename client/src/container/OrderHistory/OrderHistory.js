import React, { Component } from 'react';
import { connect } from 'react-redux';

import HistoryCard from '../../Components/OrderHistoryCard/OrderHistoryCard';
import * as actions from '../../store/index';

class OrderHistory extends Component {
  componentDidMount() {
    this.props.onReload();
    this.props.fetch(this.props.signInUp.token, this.props.signInUp.id);
  }
  render() {
    return <HistoryCard checkAuth={this.props.signInUp.isAuth} order={this.props.orderArray} />;
  }
}

const mapStateToProps = state => {
  return {
    orderArray: state.order.orderHistoryArray,
    signInUp: state.account
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
