import React from 'react';
import { Form, Col } from 'react-bootstrap';
import { Popover, PopoverBody } from 'reactstrap';

const FormType = props => {
  return (
    <Form.Group as={Col} md={12} xs={12}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        className={props.className}
        onInput={props.change}
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={`Enter your ${props.label}`}
        required={props.required}
      />
      <Popover placement="top" isOpen={props.openPopOver} target={props.name}>
        <PopoverBody>{props.popOverDetails}</PopoverBody>
      </Popover>
    </Form.Group>
  );
};

export default FormType;
