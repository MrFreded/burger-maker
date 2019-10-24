import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/index';

const Logout = props => {
  const redirect = () => {
    props.onLogout();
    let x = <Redirect to="/" />;
    return x;
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return <div>{redirect()}</div>;
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.innitLogout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
