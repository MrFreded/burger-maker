import React, {Component} from 'react';
import {Col,Row} from 'react-bootstrap';

import styles from './Modal.module.css';

export default class Modal extends Component{
    
    render(){
        let modal;
        if(this.props.showModal){
        modal= 
          <Row className={"justify-content-center"}>
            <Col xs ={4} className = {styles.Modal}>
                {this.props.children}
            </Col> 
           </Row>

        }else{
            modal= null;
        }
        return(
            <span>
               {modal} 
            </span>
         
        );
    }
}