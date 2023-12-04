import React, { useState } from "react";
import "./checkbox.scss";
import checkIcon from "../../icons/check-icon.svg";
interface CheckboxProps {
  className?: string;
  options?: string[];
  checkboxColor?: string;
  onSelect?: (currentSelected: string, selectedValues: string[]) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  options = [],
  checkboxColor,
  onSelect = () => {},
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
    <div className={`checkbox-container ${className}`}>
      {options.map((option, index) => (
        <div
          className="checkbox-label"
          onClick={() => handleCheckboxChange(index)}
        >
          <div
            style={{
              backgroundColor: checkboxColor,
              borderColor: checkboxColor,
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
              backgroundColor: checkboxColor,
            }}
            onClick={() => handleCheckboxChange(index)}
          ></div>
          <label className="label-text">{option}</label>
        </div>
      ))}
    </div>
  );
};
