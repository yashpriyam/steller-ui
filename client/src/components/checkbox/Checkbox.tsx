import React, { useEffect, useState } from "react";
import "./checkbox.scss";
import checkIcon from "../../icons/check-icon.svg";
interface CheckboxProps {
  className?: string;
  options: {text: string, value : string}[];
  bgColor?: string;
  textColor?: string;
  onSelect?: (currentSelected: string, selectedValues: string[]) => void;
  style?: {};
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
  direction="column",
  title,

}) => {
  const [selectedValues, setSelectedValues] = useState<Record<number, boolean>>(
    {}
  );
  const [hoverBg, setHoverBg] = useState<boolean[]>([]);

  useEffect(()=>{
    const newHoverBg : boolean[] = options.map(elem=>false);
    setHoverBg(newHoverBg);
  },[options])
  
  const handleCheckboxChange = (index: number) => {
    const newSelectedValues : Record<number,boolean> = { ...selectedValues };
    if (newSelectedValues[index]) {
      delete newSelectedValues[index];
    } else {
      newSelectedValues[index] = true;
    }
    setSelectedValues(newSelectedValues);
    onSelect(options[index].value, Object.keys(newSelectedValues));
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
              style={{ borderColor: bgColor }}
              onMouseOver={() => {
                hoverBg[index] = true;
                setHoverBg([...hoverBg]);
              }}
              onMouseOut={() => {
                hoverBg[index] = false;
                setHoverBg([...hoverBg]);
              }}
            >
              {hoverBg[index] && (
                <div
                  className={`${
                    selectedValues[index] && "animated-checkbox-bg"
                  } checkbox-bg`}
                  style={{
                    ...style,
                    backgroundColor: `${hoverBg[index] && bgColor}`,
                    opacity: 0.2,
                  }}
                ></div>
              )}
              {selectedValues[index] && (
                <div
                  style={{
                    ...style,
                    backgroundColor: bgColor,
                    borderColor: bgColor,
                  }}
                  className="custom-checkbox"
                >
                  <img className="checkmark-icon" src={checkIcon} alt="icon" />
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
