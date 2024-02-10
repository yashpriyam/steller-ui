import React, { useEffect, useState } from "react";
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
  type = "multi"
}) => {
  const [selectedValues, setSelectedValues] = useState<Record<number, CheckboxValueType>>({});

  const initializeSelectedValues = () => {
    const initialSelectedValues: Record<number, CheckboxValueType> = {};
    options.map((optionData, index) => {
      if(optionData.isChecked){
        initialSelectedValues[index] = optionData;
      }
    });
    setSelectedValues(initialSelectedValues);
  }

  useEffect(()=> {
    initializeSelectedValues()
  },[])

  const validTypes = {
    SINGLE: "single",
    MULTI: "multi",
  }

  const handleMultiSelectChange = (index: number) => {
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
  }

  const handleSingleSelectChange = (index: number) => {
    const newValues:Record<number, CheckboxValueType> = {};
    if(!selectedValues[index]){
      newValues[index] = options[index];
    }
    setSelectedValues(newValues)
    onSelect(options[index], newValues);
  }

  const handleCheckboxChange = (index: number) => {
    switch(type){
      case validTypes.SINGLE:
        handleSingleSelectChange(index);
        break;
      case validTypes.MULTI:
        handleMultiSelectChange(index);
        break;
    }
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
              <label className="checkbox-label-text" style={{ color: textColor }}>
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
