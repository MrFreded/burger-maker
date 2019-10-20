import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    return (
      <button
        id={this.props.btnId}
        className={this.props.className}
        onClick={this.props.clicked}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}
