import React from 'react';

const Button = props => {
  return (
    <button
      id={props.btnId}
      className={props.className}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
