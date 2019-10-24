import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Buttons from '../Buttons/Buttons';
import styles from './BurgerControls.module.css';
import Button from '../Buttons/Button';

const BurgerControls = props => {
  let buttons = Object.keys(props.ingredients).map((key, index) => {
    let lessBtnDisableCheck;
    lessBtnDisableCheck = props.ingredients[key] <= 0;

    return (
      <Buttons
        key={index}
        ingredientType={key}
        MoreBtn={() => props.addMoreBtn(key)}
        lessBtnDisabled={lessBtnDisableCheck}
        LessBtn={() => props.reduceBtn(key)}
      />
    );
  });
  return (
    <Row className={['justify-content-center mt-5', styles.BurgerControls].join(' ')}>
      <Col xs={10} md={7}>
        <Row className={'justify-content-center'}>
          <p className={styles.p}>
            <strong>Total Price: {props.price}</strong>
          </p>
          {buttons}

          <Button disabled={props.disabled} clicked={props.orderNowBtn} className={styles.OrderBtn}>
            Order Now
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default BurgerControls;
