import React from 'react';
import { Col, Row } from 'react-bootstrap';

import styles from './OrderHistoryCard.module.css';

const HistoryCard = props => {
  let orders;
  if (props.checkAuth && props.order.length !== 0) {
    orders = props.order.map((el, ind) => {
      let ingredients = Object.keys(el.ingredients).map((key, index) => {
        return (
          <li key={index} className={styles.li}>
            {key} - {[el.ingredients[key], ' '].join(' ')}
          </li>
        );
      });
      return (
        <Col key={ind} className={[styles.box, 'text-center'].join(' ')} xs={12} md={4}>
          <Row className="justify-content-center">
            <h6>Date - {el.date}</h6>
            <ul>{ingredients}</ul>
            <h6>Total Price - {el.totalPrice}</h6>
          </Row>
        </Col>
      );
    });
  } else if (props.checkAuth && props.order.length === 0) {
    orders = (
      <Col className="text-center" xs={12} md={12}>
        <h6>You have no Order History</h6>
      </Col>
    );
  } else {
    orders = (
      <Col className="text-center" xs={12} md={12}>
        <h6>Please login/sign up.</h6>
      </Col>
    );
  }

  return (
    <Row className={['justify-content-center', styles.historyHolder].join(' ')}>
      <Col xs={9} md={10}>
        <Row className="justify-content-start">{orders}</Row>
      </Col>
    </Row>
  );
};

export default HistoryCard;
