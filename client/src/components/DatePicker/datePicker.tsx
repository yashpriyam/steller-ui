import React, { useState } from "react";
import "./datePicker.scss";
import SVGCalenderComponent from "../../icons/svgDatePicker";

interface DatePickerProps {
  classname?: string;
  style?: React.CSSProperties;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  calenderBg?: string;
  calenderText?: string;
  placeHolder?: string;
  format?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isError?: boolean;
  onSelect?: (selectedValue: string) => void;
  icon?: string;
  label?: string;
  labelPosition?: "left" | "right";
  maxDate?: string;
  minDate?: string;
}

interface DatePickerState {
  selectedValue: string;
  isCalenderOpen: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  classname,
  style = {},
  bgColor,
  textColor,
  borderColor,
  calenderBg = "white",
  calenderText,
  placeHolder = "Choose a date",
  format = "DD/MM/YYYY",
  isDisabled = false,
  isRequired = false,
  isError = false,
  onSelect,
  icon,
  label,
  labelPosition = "left",
  maxDate = "",
  minDate = "",
}: DatePickerProps) => {
  const [datePicker, setDatePicker] = useState<DatePickerState>({
    selectedValue: "",
    isCalenderOpen: false,
  });
  const [isValidInput, setIsValidInput] = useState<Boolean>(true);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const inputValue = e.target.value;

    const inpYear = new Date(inputValue).getFullYear();
    const strYear = String(inpYear);

    const newDate = new Date(inputValue).getTime();
    const maxmDate = new Date(maxDate).getTime();
    const miniDate = new Date(minDate).getTime();

    if (newDate > maxmDate && strYear.length === 4) {
      setIsValidInput(false);
      
      setDatePicker((prevState) => ({
        ...prevState,
        selectedValue: inputValue,
        isCalenderOpen: false,
      }));
      return;
    }
    if (newDate < miniDate && strYear.length === 4) {
      setIsValidInput(false);
      
      setDatePicker((prevState) => ({
        ...prevState,
        selectedValue: inputValue,
        isCalenderOpen: false,
      }));
      return;
    }
    else{
        handleSelect(inputValue)
    }
  };

  const  handleSelect = (value: string)=>{
    setDatePicker({ ...datePicker, selectedValue:value})
    setIsValidInput(true)

    if(onSelect){
        onSelect(value)
    }
}

  return (
    <div className={`date-container ${classname}`}>
      {!isDisabled && (
        <div className={`date-box ${classname}`} style={{ ...style }}>
          {label && labelPosition === "left" && (
            <label className={`date-label ${classname}`}>{label}</label>
          )}
          {isRequired && (
            <div className={`date-picker-required ${classname}`}>
              <h3 className={`date-picker-star ${classname}`}>*</h3>
            </div>
          )}
          <div className="date-input-container">
            <input
              className={`date-picker-input ${classname}`}
              type="date"
              placeholder={placeHolder}
              value={datePicker.selectedValue}
              style={{
                backgroundColor: bgColor,
                color: textColor,
                borderColor: isValidInput && !isError ? borderColor : "red",
              }}
              disabled={isDisabled}
              required={isRequired}
              max={maxDate}
              min={minDate}
              onChange={handleOnChange}
            />
            <span className="open-button" style={{background: bgColor}}>
              <button type="button" className="button" >
                {icon || <SVGCalenderComponent />}
              </button>
            </span>
          </div>
          {label && labelPosition === "right" && (
            <label className={`date-label ${classname}`}>{label}</label>
          )}
        </div>
      )}
    </div>
  );
};
