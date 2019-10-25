import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Button from './Button';
import styles from './Buttons.module.css';

const Buttons = props => {
  return (
    <Col xs={12} className={styles.btnHolder}>
      <Row className={'justify-content-between'}>
        <Col xs={3} md={4} className="text-right">
          <label className={styles.label}>{props.ingredientType}</label>
        </Col>
        <Col xs={3} md={4} className="text-center">
          <Button className={styles.btn} clicked={props.MoreBtn}>
            More
          </Button>
        </Col>
        <Col xs={3} md={4} className="text-left">
          <Button className={styles.btn} clicked={props.LessBtn} disabled={props.lessBtnDisabled}>
            Less
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default Buttons;
