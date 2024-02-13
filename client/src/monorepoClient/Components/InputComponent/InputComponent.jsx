import React, { useEffect, useState } from "react";
import "./InputComponent.scss";
import InputDropdown from "../InputDropdown/InputDropdown";
import { useCity } from "../../../redux/actions/cityAction";
const InputComponent = ({
  inputProps,
  value,
  onChange,
  labelClass,
  className = "",
  autoComplete,
  batchData,
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
    isDataList = false,
    defaultValue,
  } = inputProps;

  const [isOpen, setOpen] = useState(false);
  const {cities,getAllCities} = useCity();
  const { cityList = [] } = cities || {};
  useEffect(()=>{
    if(isDataList){
      getAllCities({})
    }
  },[])
  return (
    <>
      {isDropdown && (
        <div className="inputDropdownContainer">
          <InputDropdown
            className={`defaultInputDropdownClass ${className}`}
            optionList={optionList}
            value={value}
            defaultValue={defaultValue}
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
      )}
      {!isDropdown && !isDataList && (
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
      {isDataList && (
        <div className="inputContainer">
          <input
            type="text"
            id={type}
            list="options"
            placeholder={placeholder}
            className="defaultInputClass"
            onChange={(e) => onChange(e.target.value)}
            onBlur={(e) => {
              const value = e.target.value;
              if (value && !cityList.includes(value)) {
                e.target.value = "";
              }
            }}
          />
          <datalist id="options" className="datalist-container">
            {cityList?.map((option, index) => (
              <option key={index} value={option} />
            ))}
          </datalist>
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
