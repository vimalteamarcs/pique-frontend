import React from "react";

export default function Input({
  type,
  name,
  showPassword,
  togglePasswordVisibility,
  ...props
}) {
  return (
    <div className="input-group">
      <input
        type={showPassword && (name === "password" || name === "cpassword") ? "text" : type}
        placeholder={props.placeholder}
        name={name}
        id={props.id}
        className="form-control"
        {...props}
      />
      {(name === "password" || name === "cpassword") && (
        <span
          className=" eye-icon"
          onClick={togglePasswordVisibility}
          style={{ cursor: "pointer" }}
        >
          {showPassword ? (
            <i className="fas fa-eye"></i>  
          ) : (
            <i className="fas fa-eye-slash"></i> 
          )}
        </span>
      )}
    </div>
  );
}
