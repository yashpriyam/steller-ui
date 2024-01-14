import React, { useState } from "react";
import "./checkbox.scss";
import { CheckboxIcon } from "../../icons/index";

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  options = [],
  onSelect = () => { },
  bgColor,
  style,
  textColor,
  direction = "column",
  title,
}) => {
  const [selectedValues, setSelectedValues] = useState<Record<number, CheckboxValueType>>({});

  const handleCheckboxChange = (index: number) => {
    const newselectedValues = {
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
                  <CheckboxIcon />
                </div>
              )}
            </div>
            <div className="checkbox-option-container">
              <label className="label-text" style={{ color: textColor }}>
                {option?.text}
              </label>
              {
                option?.imageUrl && (<img className="checkbox-comp-option-img" src={option?.imageUrl} alt="" />)
              }
              {
                option?.iframe && (<iframe src={option.iframe} width="100%" />)
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
