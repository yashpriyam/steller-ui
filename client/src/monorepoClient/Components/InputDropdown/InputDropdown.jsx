import React from "react";
import "./InputDropdown.scss";
import ImageComponent from "../ImageComponent/ImageComponent";
import Dropdown from "../../assets/images/dropdown.svg";
import Dropup from "../../assets/images/dropup.svg";
const InputDropdown = ({
  className,
  value = "Choose the options",
  optionList = [],
  setDropDownValue,
  isOpen = false,
  setOpen,
  children,
  defaultValue,
}) => {
  return (
    <div
      onClick={() => setOpen((prev) => !prev)}
      className={`${className} inputDropdownSecondaryClass`}
    >
      {children}

      <div className="dropdownIcon">
        {isOpen ? (
          <>
            <p className={`${value === "" && "placeholderDropDown"}`}>
              {defaultValue ? defaultValue : value === "" ? "Choose the options" : value}
            </p>
            <ImageComponent src={Dropup} alt="dropup" />
          </>
        ) : (
          <>
            <p className={`${value === "" && "placeholderDropDown"}`}>
              {defaultValue ? defaultValue : value === "" ? "Choose the options" : value}
            </p>
            <ImageComponent src={Dropdown} alt="dropdown" />
          </>
        )}
      </div>
      {isOpen && (
        <div className="dropdownOptions">
          {optionList.map((option, index) => (
            <div
              key={index}
              onClick={() => setDropDownValue(option)}
              className="dropdownOption"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputDropdown;
