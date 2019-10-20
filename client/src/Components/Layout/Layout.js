import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

import Navigation from '../Navigation/Navigation';

class Layout extends Component {
  render() {
    return (
      <Row className="justify-content-center">
        <Col xs={12}>
          <header>
            <Navigation />
          </header>
          <main>{this.props.children}</main>
        </Col>
      </Row>
    );
  }
}

export default Layout;
