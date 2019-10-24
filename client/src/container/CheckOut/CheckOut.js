import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import Burger from '../../Components/Burger/Burger';
import * as actions from '../../store/index';
import Delivery from './DeliveryDetails';

const CheckOut = props => {
  const { onReload } = props;
  useEffect(() => {
    onReload();
  }, [onReload]);

  return (
    <Row>
      <Col xs={12}>
        <Burger updatedIngredients={props.ing} />
        <Delivery />
      </Col>
    </Row>
  );
};
const mapStateToProps = state => {
  return {
    ing: state.burger.ingredients
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onReload: () => dispatch(actions.checkValidTokenOnReload())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckOut);
