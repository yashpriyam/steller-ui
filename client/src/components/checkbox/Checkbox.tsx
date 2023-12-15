import React, { useState } from "react";
import "./checkbox.scss";
import CheckIcon from "../../icons/CheckIcon";
interface CheckboxProps {
  className?: string;
  options: { text: string; value: string }[];
  bgColor?: string;
  textColor?: string;
  onSelect?: (currentSelected: {}, selectedValues: {}[]) => void;
  style?: React.CSSProperties;
  direction?: "row" | "column";
  title?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  options = [],
  onSelect = () => {},
  bgColor,
  style,
  textColor,
  direction = "column",
  title,
}) => {
  const [selectedValues, setSelectedValues] = useState<{}[]>([]);

  const handleCheckboxChange = (index: number) => {
    const newselectedValues: {}[] = {
      ...selectedValues
    };
    if (newselectedValues[index]) {
      delete newselectedValues[index];

    } else {
      newselectedValues[index] = options[index];
    }
    setSelectedValues(newselectedValues);
    
    onSelect(options[index], newselectedValues);
  };

  return (
    <div className={`checkbox-container ${className}`}>
      {title && <p className="title">{title}</p>}
      <div
        className="checkbox-label-wrapper"
        style={{ flexDirection: direction }}
      >
        {options.map((option, index) => (
          <div
            className="checkbox-label"
            onClick={() => handleCheckboxChange(index)}
          >
            <div
              className="checkbox-wrapper"
              style={{ ...style, borderColor: bgColor }}
            >
              {selectedValues[index] && (
                <div
                  style={{
                    ...style,
                    backgroundColor: bgColor,
                  }}
                  className="custom-checkbox"
                >
                  <CheckIcon />
                </div>
              )}
            </div>
            <label className="label-text" style={{ color: textColor }}>
              {option?.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
