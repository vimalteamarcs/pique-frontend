import React from 'react';

const Button = ({ type = 'button', className, label, onClick, disabled, children, ...props }) => {
  return (
    <button
      type={type}
      className={`btn ${className} fw-3 text-center d-inline-block`}
      onClick={onClick}
      disabled={disabled}
      {...props} 
    >
      {children || label}
    </button>
  );
};

export default Button;
