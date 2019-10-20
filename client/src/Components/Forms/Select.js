import React, {Component} from 'react';
import {Form, Col} from 'react-bootstrap';

export default class SelectType extends Component{
    render(){
        return(
            <Form.Group as={Col} xs ={12} controlId="formGridState">
            <Form.Label>{this.props.label}</Form.Label>
            <Form.Control
            onChange = {this.props.changed} as="select">
              <option>{this.props.option1}</option>
              <option>{this.props.option2}</option>
              <option>{this.props.option3}</option>
            </Form.Control>
          </Form.Group>
        );
    }
}