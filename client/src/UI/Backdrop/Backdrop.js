import React, {Component} from 'react';
import {Row,Col} from 'react-bootstrap';

import styles from './Backdrop.module.css';

export default class Backdrop extends Component{
    render(){
        let backDrop 
        if(this.props.showBackDrop){
            backDrop =  <Row className={"justify-content-center"}><Col onClick = {this.props.clicked} className={styles.backdrop}></Col></Row>;
        }else{
            backDrop = null;
        }
        return(
          <span>{backDrop}</span>
        );
    }
}