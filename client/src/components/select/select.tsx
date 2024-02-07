import React, { useEffect, useRef, useState } from "react";
import "./select.scss";
import { useUpdateThemeColor } from "../../hooks/useUpdateThemeColor";
import { useSelectStyles } from "./select.styles";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";

export const Select: React.FC<SelectProps> = ({
  isDisabled,
  className,
  data = [],
  defaultSelected = "Select an Option",
  onSelect = (option: SelectOptionType) => {},
  label,
  labelPosition = "bottom",
  isRequired,
  isError,
  placeHolder,
  style = {},
  backgroundColor,
}: SelectProps) => {
  const selectClassName = useUpdateThemeColor({
    useStyle: useSelectStyles,
    colors: {
      primaryBgColor: backgroundColor,
    },
  });
  const [selectedValue, setSelectedValue] = useState<string>(defaultSelected);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const labelPositions: Record<string, string> = {
    top: "top",
    bottom: "bottom",
  };

  const handleSelect = (option: SelectOptionType): void => {
    setSelectedValue(option.text);
    setIsOpen(false);
    onSelect(option);
  };

  useOnOutsideClick(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    setIsOpen(false);
  }, [isDisabled]);

  return (
    <div
      ref={dropdownRef}
      style={style}
      className={`select-container ${className}`}
    >
      <div className={`select`}>
        {label && labelPosition === labelPositions.top && (
          <label className="label">{label}</label>
        )}
        <div
          className={`
          select-box ${isError && selectClassName.selectError} ${
            isDisabled && "select-disabled"
          }
        ${selectClassName.selectBox}
        `}
          onClick={() => {
            !isDisabled && setIsOpen(!isOpen);
          }}
        >
          {isRequired && (
            <div
              className={`
            ${selectClassName.selectRequiredTag}
            ${isRequired && "select-required-tag"} `}
            >
              <span>*</span>
            </div>
          )}
          <div className="selected-value">
            {selectedValue || placeHolder || "Select an option"}
          </div>
          {isOpen && (
            <ul
              className={`${selectClassName.optionContainer} options-container`}
            >
              {data.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`list-child ${
                    option.text === selectedValue &&
                    `${selectClassName.selectedOption}`
                  } ${selectClassName.optionList}`}
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
