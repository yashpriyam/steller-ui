import React, { useEffect, useRef, useState } from "react";
import "./select.scss";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";

interface SelectProps {
  isDisabled?: boolean;
  className?: string;
  data?: { text: string; value: string }[];
  defaultSelected?: string;
  onSelect?: (option : {}) => void;
  label?: string;
  labelPosition?: "top" | "bottom";
  isRequired?: boolean;
  isError?: boolean;
  placeHolder?: string;
  style?: object;
}


export const SelectComp: React.FC<SelectProps> = ({
  isDisabled = false,
  className = "",
  data = [],
  defaultSelected = "Select an Option",
  onSelect = (option={}) => {},
  label = "",
  labelPosition = "bottom",
  isRequired = false,
  isError = false,
  placeHolder = "Select",
  style={}
}: SelectProps) => {

  const [selectedValue, setSelectedValue] = useState<string>(defaultSelected);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const labelPositions: Record<string, string> = {
    top: "top",
    bottom: "bottom",
  };
  
  
  type Option = {
    value: string;
    text: string;
  };

  const handleSelect = (option: Option): void => {
    setSelectedValue(option.text);
    setIsOpen(false);
    onSelect(option);
  };

  
  useOnOutsideClick(dropdownRef,()=>setIsOpen(false))

  useEffect(()=>{
    setIsOpen(false);
  },[isDisabled])

  return (
    <div ref={dropdownRef} style={style} className={`select-container ${className}`}>
      <div className={`select`}>
        {label && labelPosition === labelPositions.top && (
          <label className="label">{label}</label>
        )}
        <div
          className={`select-box ${isError && "select-error"} ${
            isDisabled && "select-disabled"
          }`}
          onClick={() => {
            !isDisabled && setIsOpen(!isOpen);
          }}
        >
          {isRequired && (
            <div className={`${isRequired && "select-required-tag"}`}>
              <span>*</span>
            </div>
          )}
          <div className="selected-value">
            {selectedValue || placeHolder || "Select an option"}
          </div>
          {isOpen && (
            <ul
              className={`options-container ${
                labelPosition === labelPositions.top && "label-position-top"
              }`}
            >
              {data.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`list-child ${
                    option.text === selectedValue && "selected-option"
                  }`}
                >
                  {option.text}
                </li>
              ))}
            </ul>
          )}
        </div>
        {label && labelPosition === labelPositions.bottom && (
          <label className="label">{label}</label>
        )}
      </div>
    </div>
  );
};
