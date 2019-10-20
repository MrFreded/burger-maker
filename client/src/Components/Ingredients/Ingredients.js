import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import styles from './Ingredients.module.css';

export default class Ingredients extends Component {
  render() {
    let Ingredients = [];
    let updatedIngredients;
    Object.keys(this.props.Ingredients).forEach(key => {
      Ingredients = [
        ...Ingredients,
        ...(key + ' ')
          .repeat(this.props.Ingredients[key])
          .trim()
          .split(' ')
      ];
    });
    Ingredients = Ingredients.filter(key => {
      return key !== '';
    });
    if (Ingredients.length === 0) {
      updatedIngredients = (
        <h5>
          <strong>Please make your burger!</strong>
        </h5>
      );
    } else {
      updatedIngredients = Ingredients.map((ingredientType, index) => {
        return <div className={styles[ingredientType]} key={index}></div>;
      });
    }

    return (
      <Row className={'justify-content-center'}>
        <div className={styles.Burger}>
          <div className={styles.BreadTop}>
            <div className={styles.Seeds1}></div>
            <div className={styles.Seeds2}></div>
          </div>
          {updatedIngredients}
          <div className={styles.BreadBottom}></div>
        </div>
      </Row>
    );
  }
}
