import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Nav.module.css';

const NavigationItems = props => {
  return (
    <NavLink exact={props.exact} className={NavLink} to={props.link} className={styles.linkItem}>
      {props.linkName}
    </NavLink>
  );
};

export default NavigationItems;
