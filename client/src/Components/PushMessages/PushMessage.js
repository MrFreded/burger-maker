import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Modal from '../../UI/Modal/Modal';
import Button from '../Buttons/Button';
import styles from './PushMessage.module.css';
import BackDrop from '../../UI/Backdrop/Backdrop';

const PushMessage = props => {
  let className;
  if (props.btnStyle === 'failBtn') {
    className = styles.failBtn;
  } else if (props.btnStyle === 'successBtn') {
    className = styles.successBtn;
  }
  return (
    <span>
      <Modal showModal={props.whenShowPushMessage}>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <h5>{props.heading}</h5>
            <h6>{props.body}</h6>
            <Button className={className} clicked={props.clickPushMessage}>
              {props.action}
            </Button>
          </Col>
        </Row>
      </Modal>
      <BackDrop showBackDrop={props.whenShowPushMessage} clicked={props.clickPushMessage} />
    </span>
  );
};

export default PushMessage;
