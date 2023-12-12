import React, { useState } from "react";
import "./datePicker.scss";
import SVGCalenderComponent from "../../icons/svgDatePicker";

interface DatePickerProps {
    classname?: string,
    style?: React.CSSProperties,
    bgColor?: string,
    textColor?: string,
    borderColor?: string,
    calenderBg?: string,
    calenderText?: string,
    placeHolder?: string,
    format?: string,
    isDisabled?: boolean,
    isRequired?: boolean,
    isError?: boolean,
    onSelect?: (selectedValue: string)=>void,
    icon?: string,
    label?: string,
    labelPosition?: 'left' | "right",
    maxDate?: string,
    minDate?: string
}

interface DatePickerState {
    selectedValue: string,
    isCalenderOpen: boolean
}

export const DatePicker: React.FC<DatePickerProps> =({
    classname,
    style={},
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
    maxDate='',
    minDate=''
}: DatePickerProps)=>{
    const [datePicker, setDatePicker] = useState<DatePickerState>({
        selectedValue:'',
        isCalenderOpen: false
    })
    const [isValidInput, setIsValidInput] = useState<Boolean>(true)

    const handleMaxDate = (value: string)=>{
        const inpYear = new Date(value).getFullYear();
        const strYear = String(inpYear);
        
        const newDate = new Date(value).getTime();
        const maxmDate = new Date(maxDate).getTime();

          if(newDate > maxmDate && strYear.length === 4){
           setIsValidInput(false)
           console.log('more than maxdate');
            setDatePicker(prevState => ({
                ...prevState,
                selectedValue: '',
                isCalenderOpen: false
              }))
              value = ''
          }
    }

    const handleMinDate = (value: string) =>{
        const inpYear = new Date(value).getFullYear();
        const strYear = String(inpYear);

        const newDate = new Date(value).getTime();
        const miniDate = new Date(minDate).getTime();
        
        if(newDate < miniDate && strYear.length === 4){
            setIsValidInput(false)
            console.log('less thn min date');
            setDatePicker(prevState => ({
                ...prevState,
                selectedValue: '',
                isCalenderOpen: false
              }))
              value = ''
        }

    }

    const  handleSelect = (value: string)=>{
        setDatePicker({ ...datePicker, selectedValue:value})
        setIsValidInput(true)
        console.log("correct date");
        
        if(onSelect){
            onSelect(value)
        }
    }
    return(
        <div className={`date-container ${classname}`}>
            {!isDisabled &&
            <div className={`date-box ${classname}`} style={{...style}}>
                {label && labelPosition === "left" && <label className={`date-label ${classname}`}>{label}</label>}
                {isRequired && 
                <div className={`date-picker-required ${classname}`}>
                    <h3 className={`date-picker-star ${classname}`}>*</h3>
                </div>
                }
                <div className="date-input-container">
                   <input className={`date-picker-input ${classname}`}
                   type="date"
                   placeholder={placeHolder}
                   value={datePicker.selectedValue}
                   style={{
                    backgroundColor: bgColor,
                    color: textColor,
                    borderColor: isValidInput && !isError ? borderColor : "red",
                   }}
                   disabled = {isDisabled} 
                   required={isRequired}
                   max={maxDate}
                   min={minDate}
                   onChange={(e)=>{
                    e.preventDefault();
                    const inputValue = e.target.value;
                    
                    if(inputValue < minDate){
                        handleMinDate(inputValue)
                    } 
                    if(inputValue > maxDate){
                        handleMaxDate(inputValue)
                    }
                    else{  
                        handleSelect(inputValue)
                    }
                    
                    }}
                   />
                    <span className="open-button">
                      <button type="button" className="button">
                        {icon || <SVGCalenderComponent/>}
                      </button>
                    </span>
                </div>
                {label && labelPosition === "right" && <label className={`date-label ${classname}`}>{label}</label>}
            </div>
            }
        </div>
    )
}

