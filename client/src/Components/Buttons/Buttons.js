import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';

import Button from './Button';
import styles from './Buttons.module.css';

export default class Buttons extends Component{
    render(){
        return(
         <Col xs ={12} className= {styles.btnHolder}>
             <Row className={"justify-content-between"}>
                 <Col xs ={4} className="text-right">
                   <label className = {styles.label}>{this.props.ingredientType}</label>
                 </Col>
                 <Col xs ={4} className="text-center">
                   <Button className = {styles.btn}  clicked={this.props.MoreBtn}>More</Button>
                 </Col>
                 <Col xs ={4} className="text-left">
                   <Button className = {styles.btn} clicked={this.props.LessBtn} disabled = {this.props.lessBtnDisabled}>Less</Button>
                 </Col>
             </Row>
         </Col>
            );
    }
}

