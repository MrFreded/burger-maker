import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/index';

class Logout extends Component {
  redirect = () => {
    // this.props.history.push('/')
    this.props.onLogout();
    let x = <Redirect to="/" />;
    return x;
  };
  componentDidMount() {
    localStorage.clear();
  }
  render() {
    return <div>{this.redirect()}</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.innitLogout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
