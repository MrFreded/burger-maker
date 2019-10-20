import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import Burger from '../../Components/Burger/Burger';
import * as actions from '../../store/index';
import Delivery from './DeliveryDetails';

class CheckOut extends Component {
  componentDidMount() {
    this.props.onReload();
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <Burger updatedIngredients={this.props.ing} />
          <Delivery />
        </Col>
      </Row>
    );
  }
}
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
