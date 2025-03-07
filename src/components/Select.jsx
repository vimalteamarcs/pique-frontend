import React from "react";

const Select = ({ name, options, value, onChange, defaultOption, icon, className }) => {
    const handleChange = (e) => {
        const selectedValue = e.target.value;
        // const selectedName = e.target.options[e.target.selectedIndex].text;
        onChange({ target: { name, value: selectedValue } });
  
    };
  
    return (
      <div className="position-relative w-100"> 
         {icon && (
        <i
          className={'fa-solid fa-location-dot position-absolute text-muted'}
          style={{ left: "12px", top: "50%", transform: "translateY(-50%)" }}
        ></i>
      )}
        <select name={name} className={`form-control ${icon ? "ps-5 text-muted" : ""} ${className || ""}`} onChange={handleChange} value={value}>
          <option value="">{defaultOption || "--Choose Option--"}</option>
          {options &&
            options.map((option, index) => (  
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      </div>
    );
  };
  

export default Select;
