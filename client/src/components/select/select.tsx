import React, { useEffect, useState } from "react";
import "./select.scss";

interface SelectProps {
  isDisabled?: boolean;
  className?: string;
  data?: { text: string; value: string }[];
  defaultSelected?: string;
  onSelect?: (value : string) => void;
  label?: string;
  labelPosition?: "top" | "bottom";
  isRequired?: boolean;
  isError?: boolean;
  placeHolder?: string;
}

export const SelectComp: React.FC<SelectProps> = ({
  isDisabled = false,
  className = "",
  data = [],
  defaultSelected = "Select an Option",
  onSelect = (value="") => {},
  label = "",
  labelPosition = "bottom",
  isRequired = false,
  isError = false,
  placeHolder = "Select",
}: SelectProps) => {

  const [selectedValue, setSelectedValue] = useState<string>(defaultSelected);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const labelPositions: Record<string, string> = {
    top: "top",
    bottom: "bottom",
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onSelect(value);
  };

  useEffect(()=>{
    setIsOpen(false);
  },[isDisabled])

  return (
    <div className={`select-container ${className}`}>
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
                  onClick={() => handleSelect(option.value)}
                  className={`list-child ${
                    option.value === selectedValue && "selected-option"
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
