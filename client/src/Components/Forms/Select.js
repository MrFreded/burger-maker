import React from 'react';
import { Form, Col } from 'react-bootstrap';

const SelectType = props => {
  return (
    <Form.Group as={Col} xs={12} controlId="formGridState">
      <Form.Label>{props.label}</Form.Label>
      <Form.Control onChange={props.changed} as="select">
        <option>{props.option1}</option>
        <option>{props.option2}</option>
        <option>{props.option3}</option>
      </Form.Control>
    </Form.Group>
  );
};

export default SelectType;
