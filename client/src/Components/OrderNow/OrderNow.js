import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Modal from '../../UI/Modal/Modal';
import Button from '../Buttons/Button';
import styles from './OrderNow.module.css';

const OrderNow = props => {
  let summary = Object.keys(props.checkOutIngredients).map((key, index) => {
    return (
      <li className="text-center" key={index}>
        {' '}
        {key} : {props.checkOutIngredients[key]}{' '}
      </li>
    );
  });
  return (
    <Modal showModal={props.checkPurchasing}>
      <Row className="justify-content-center">
        <Col xs={12} className="text-center">
          <h5>Order Summary</h5>
          <h6>Total price : {props.checkOutPrice}</h6>
        </Col>
        <Col xs={12}>
          <Row className="justify-content-center">
            <ul>{summary}</ul>
          </Row>
          <Col xs={12}>
            <Row className="justify-content-center">
              <Button
                className={[styles.btn, styles.cancel].join(' ')}
                clicked={props.cancelCheckout}
              >
                Cancel
              </Button>
              <Button
                className={[styles.btn, styles.continue].join(' ')}
                clicked={props.continueCheckout}
              >
                Continue
              </Button>
            </Row>
          </Col>
        </Col>
      </Row>
    </Modal>
  );
};

export default OrderNow;
