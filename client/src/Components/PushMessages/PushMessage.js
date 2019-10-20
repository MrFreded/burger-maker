import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Modal from '../../UI/Modal/Modal';
import Button from '../Buttons/Button';
import styles from './PushMessage.module.css';
import BackDrop from '../../UI/Backdrop/Backdrop';

export default class OrderNow extends Component {
  render() {
    let className;
    if (this.props.btnStyle === 'failBtn') {
      className = styles.failBtn;
    } else if (this.props.btnStyle === 'successBtn') {
      className = styles.successBtn;
    }
    return (
      <span>
        <Modal showModal={this.props.whenShowPushMessage}>
          <Row className="justify-content-center">
            <Col xs={12} className="text-center">
              <h5>{this.props.heading}</h5>
              <h6>{this.props.body}</h6>
              <Button className={className} clicked={this.props.clickPushMessage}>
                {this.props.action}
              </Button>
            </Col>
          </Row>
        </Modal>
        <BackDrop showBackDrop={this.props.whenShowPushMessage} clicked={this.props.clickPushMessage} />
      </span>
    );
  }
}
