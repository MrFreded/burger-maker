import React, { Component } from 'react';
import { Form, Col } from 'react-bootstrap';
import { Popover, PopoverBody } from 'reactstrap';

export default class FormType extends Component {
  render() {
    return (
      <Form.Group as={Col} md={12} xs={12}>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control
          className={this.props.className}
          onInput={this.props.change}
          type={this.props.type}
          name={this.props.name}
          id={this.props.name}
          placeholder={`Enter your ${this.props.label}`}
          required={this.props.required}
        />
        <Popover placement="top" isOpen={this.props.openPopOver} target={this.props.name}>
          <PopoverBody>{this.props.popOverDetails}</PopoverBody>
        </Popover>
      </Form.Group>
    );
  }
}
