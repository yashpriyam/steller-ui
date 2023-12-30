import React, { useState } from "react";
import "./InputComponent.scss";
import InputDropdown from "../InputDropdown/InputDropdown";
const InputComponent = ({
  inputProps,
  value,
  onChange,
  labelClass,
  className = "",
  autoComplete,
  ...props
}) => {
  const {
    type = "text",
    placeholder = "Name",
    inputName,
    labelName = "Email",
    isDropdown = false,
    optionList = [],
    isRequired = false,
  } = inputProps;

  const [isOpen, setOpen] = useState(false);
  return (
    <>
      {isDropdown ? (
        <div className="inputDropdownContainer">
          <InputDropdown
            className={`defaultInputDropdownClass ${className}`}
            optionList={optionList}
            value={value}
            setDropDownValue={onChange}
            isOpen={isOpen}
            setOpen={setOpen}
          >
            <label htmlFor={type} className={`defaultLabelClass ${labelClass}`}>
              {labelName}
              {isRequired && <span style={{ color: "red" }}> * </span>}
            </label>
          </InputDropdown>
        </div>
      ) : (
        <div className="inputContainer">
          <input
            type={type}
            id={type}
            name={inputName}
            placeholder={placeholder}
            className={`defaultInputClass ${className}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoComplete={autoComplete}
            {...props}
          />
          <label
            htmlFor={type}
            className={`defaultLabelClass absolute ${labelClass}`}
          >
            {labelName}{" "}
            {isRequired && <span style={{ color: "red" }}> * </span>}
          </label>
        </div>
      )}
    </>
  );
};

export default InputComponent;
