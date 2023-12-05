import React, { useState } from "react";
import "./checkbox.scss";
import checkIcon from "../../icons/check-icon.svg";
interface CheckboxProps {
  className?: string;
  options: string[];
  bgColor?: string;
  textColor?: string;
  onSelect?: (currentSelected: string, selectedValues: string[]) => void;
  style?: {};
  checkboxDirection?: "row" | "column";
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  options = [],
  onSelect = () => {},
  bgColor,
  style,
  textColor,
  checkboxDirection="column",
}) => {
  const [selectedValues, setSelectedValues] = useState<Record<number, boolean>>(
    {}
  );

  const handleCheckboxChange = (index: number) => {
    const newSelectedValues = { ...selectedValues };
    if (newSelectedValues[index]) {
      delete newSelectedValues[index];
    } else {
      newSelectedValues[index] = true;
    }
    setSelectedValues(newSelectedValues);
    onSelect(options[index], Object.keys(newSelectedValues));
  };

  return (
    <div className={`checkbox-container ${className}`} style={{flexDirection:checkboxDirection}}>
      {options.map((option, index) => (
        <div
          className="checkbox-label"
          onClick={() => handleCheckboxChange(index)}
        >
          <div
            style={{
              ...style,
              backgroundColor: bgColor,
              borderColor: bgColor,
            }}
            className="custom-checkbox"
          >
            {selectedValues[index] && (
              <img className="checkmark-icon" src={checkIcon} alt="icon" />
            )}
          </div>
          <div
            className="checkbox-wrapper"
            style={{
              ...style,
              backgroundColor: bgColor,
            }}
            onClick={() => handleCheckboxChange(index)}
          ></div>
          <label className="label-text" style={{ color: textColor }}>
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};
