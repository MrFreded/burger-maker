import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Buttons from '../Buttons/Buttons';
import styles from './BurgerControls.module.css';
import Button from '../Buttons/Button';

export default class BurgerControls extends Component {
  render() {
    let buttons = Object.keys(this.props.ingredients).map((key, index) => {
      let lessBtnDisableCheck;
      lessBtnDisableCheck = this.props.ingredients[key] <= 0;

      return (
        <Buttons
          key={index}
          ingredientType={key}
          MoreBtn={() => this.props.addMoreBtn(key)}
          lessBtnDisabled={lessBtnDisableCheck}
          LessBtn={() => this.props.reduceBtn(key)}
        />
      );
    });
    return (
      <Row className={['justify-content-center mt-5', styles.BurgerControls].join(' ')}>
        <Col xs={10} md={7}>
          <Row className={'justify-content-center'}>
            <p className={styles.p}>
              <strong>Total Price: {this.props.price}</strong>
            </p>
            {buttons}

            <Button
              disabled={this.props.disabled}
              clicked={this.props.orderNowBtn}
              className={styles.OrderBtn}
            >
              Order Now
            </Button>
          </Row>
        </Col>
      </Row>
    );
  }
}
