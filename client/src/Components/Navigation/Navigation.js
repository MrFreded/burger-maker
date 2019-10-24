import React from 'react';
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';

import NavigationItems from './NavigationItems/NavigationItems';
import styles from './Navigation.module.css';
import Logo from '../../assets/burger-logo.png';

const Navigation = props => {
  let user;
  if (!props.checkAuth) {
    user = <NavigationItems link="/account" linkName="Account" />;
  } else {
    user = <NavigationItems link="/logout" linkName="Logout" />;
  }
  return (
    <Navbar collapseOnSelect expand="md" className={styles.navigation}>
      <Navbar.Brand className={styles.logo} href="/">
        <img alt="" src={Logo} width="95%" height="95%" className="d-inline-block align-top" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className={'justify-content-end'}>
        <NavigationItems exact link="/" linkName="Burger" />
        <NavigationItems link="/orders" linkName="Orders" />
        {user}
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = state => {
  return {
    ing: state.burger.ingredients,
    checkAuth: state.account.isAuth
  };
};

export default connect(mapStateToProps)(Navigation);
