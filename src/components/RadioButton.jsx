import React from "react";

const RadioButton = ({ name, options, value, onChange, label }) => {
  return (
    <div className="input-group mb-3">
      <div className="row w-100">
        {/* <div className="col-md-1">
          <label htmlFor={name} className="fw-semibold">
            {label}
          </label>
        </div> */}

        <div className="col-md-12">
          {options.map((option, index) => (
            <div key={index} className="form-check form-check-inline mb-1">
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="form-check-input custom-radio"
              />
              <label
                htmlFor={`${name}-${option.value}`}
                className="form-check-label ms-2"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RadioButton;
