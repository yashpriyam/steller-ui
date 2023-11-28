import React, { useEffect, useState } from "react";
import "../../styles/components/select/select.scss"

interface SelectProps {
  isDisabled: boolean;
  className: string;
  data: { text: string; value: string }[];
  defaultSelected: string;
  onSelect: () => void;
  label?: string;
  labelPosition?: "top" | "bottom";
  isRequired: boolean;
  isError: boolean;
  placeHolder: string;
  maxSize: number;
}

export const SelectComp: React.FC<SelectProps> = ({
  isDisabled = false,
  className = "",
  data = [],
  defaultSelected = "Default option",
  onSelect = () => {},
  label = "",
  labelPosition = "bottom",
  isRequired = false,
  isError = false,
  placeHolder = "",
  maxSize = 10,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultSelected);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropBoxSize, setdropBoxSize] = useState<number>(maxSize);
  const [dataOnUI, setDataOnUI] = useState<{ text: string; value: string }[]>(
    []
  );
  const labelPositions= { top: "top", bottom: "bottom"};

  const handleSelect = (value: string) => {
    console.log(value);
    setSelectedValue(value);
    setIsOpen(false);
    onSelect();
  };
  const handleOnScroll = (e: any) => {
    setdropBoxSize(dropBoxSize + maxSize);
    const newDataOnUI = data.slice(0, dropBoxSize + maxSize);
    setDataOnUI(newDataOnUI);
  };

  useEffect(() => {
    const newDataOnUI = data.slice(0, dropBoxSize);
    setDataOnUI(newDataOnUI);
  }, []);

  return (
    <div className={`select-container ${className}`}>
      <div className={`select ${isDisabled && "disabled"}`}>
        {label && labelPosition === labelPositions.top && (
          <label className={"label"}>{label}</label>
        )}
        {isRequired && (
          <div className={`${isRequired && "requireds"}`}>
            <span>*</span>
          </div>
        )}
        <div
          className={`select-box ${isOpen && "open"} ${isError && "error"} ${
            isDisabled && "disabled"
          }`}
          onClick={() => {
            !isDisabled && setIsOpen(!isOpen);
          }}
        >
          <div className="selected-value">
            {selectedValue || placeHolder || "Select an option"}
          </div>
          <div className={`arrow ${isOpen && "rotate-arrow"}`}>{">"}</div>
        </div>
        {label && labelPosition === labelPositions.bottom && (
          <label className={`label ${isRequired && "required"}`}>{label}</label>
        )}
        {isOpen && (
          <ul
            className={`options ${
              labelPosition === labelPositions.top && "label-position-top"
            }`}
            onScroll={handleOnScroll}
          >
            {dataOnUI.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`${option.value === selectedValue && "selected"}`}
              >
                {option.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
