import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Account from './container/Account/Account';
import CheckOut from './container/CheckOut/CheckOut';
import Logout from './container/LogOut/LogOut';
import OrderHistory from './container/OrderHistory/OrderHistory';
import ForgotPassword from './Components/AccountOptions/ForgotPassword';
import ResetPassword from './container/ResetPassword/resetPassword';

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={CheckOut} />
        <Route path="/account" component={Account} />
        <Route path="/orders" component={OrderHistory} />
        <Route path="/logout" component={Logout} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password/" component={ResetPassword} />
      </Layout>
    );
  }
}

export default withRouter(App);
