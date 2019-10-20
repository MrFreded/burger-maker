import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import Ingredients from '../Ingredients/Ingredients';

export default class Burger extends Component {
  render() {
    return (
      <Row className="justify-content-center">
        <Ingredients Ingredients={this.props.updatedIngredients} />
      </Row>
    );
  }
}
