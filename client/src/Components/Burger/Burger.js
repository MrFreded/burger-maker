import React from 'react';
import { Row } from 'react-bootstrap';

import Ingredients from '../Ingredients/Ingredients';

const Burger = props => {
  return (
    <Row className="justify-content-center">
      <Ingredients Ingredients={props.updatedIngredients} />
    </Row>
  );
};
export default Burger;
