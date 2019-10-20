import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Nav.module.css';

class NavigationItems extends Component {
  render() {
    return (
      <NavLink
        exact={this.props.exact}
        className={NavLink}
        to={this.props.link}
        className={styles.linkItem}
      >
        {this.props.linkName}
      </NavLink>
    );
  }
}

export default NavigationItems;
