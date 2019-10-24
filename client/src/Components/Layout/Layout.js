import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Navigation from '../Navigation/Navigation';

const Layout = props => {
  return (
    <Row className="justify-content-center">
      <Col xs={12}>
        <header>
          <Navigation />
        </header>
        <main>{props.children}</main>
      </Col>
    </Row>
  );
};

export default Layout;
