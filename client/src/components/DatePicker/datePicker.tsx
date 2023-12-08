import React, { useState } from "react"
import {format, parse} from 'date-fns';
import "./datePicker.scss"
import "../svg/svgDatePicker"

// enum LabelPosition {
//     LEFT = 'left',
//     RIGHT = 'right',
// } 

interface DatePickerProps {
    classname?: string,
    style?: React.CSSProperties,
    bgColor?: string,
    textColor?: string,
    borderColor?: string,
    calenderBg?: string,
    calenderText?: string,
    placeHolder?: string,
    formate?: string,
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
    formate = "DD/MM/YYYY",
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
    const [state, setState] = useState<DatePickerState>({
        selectedValue:'',
        isCalenderOpen: false
    })

    const  handleSelect = (value: string)=>{
          setState(prevState => ({
            ...prevState,
            selectedValue: value,
            isCalenderOpen: false
          }))
          if(value>maxDate){
            alert(`Date should be of before ${maxDate}`)
            setState(prevState => ({
                ...prevState,
                selectedValue: '',
                isCalenderOpen: false
              }))
              value=''
          }
          if(value<minDate){
            alert(`Date should be of after ${minDate}`)
            setState(prevState => ({
                ...prevState,
                selectedValue: '',
                isCalenderOpen: false
              }))
              value=''
          }
          if(onSelect){
            onSelect(value)
            console.log(state.selectedValue);
        }
    }
    return(
        <div className={`date-container ${classname}`}>
            {!isDisabled &&
            <div className={`date-box ${classname}`} style={style}>
                {label && labelPosition === "left" && <label className={`date-label ${classname}`}>{label}</label>}
                {isRequired && 
                <div className={`date-picker-required ${classname}`}>
                    <h3 className={`date-picker-star ${classname}`}>*</h3>
                </div>}
                <input 
                   className={`date-picker ${classname}`}
                   type="date"
                   placeholder={placeHolder}
                   value={state.selectedValue}
                   style={{
                    backgroundColor: bgColor,
                    color: textColor,
                    borderColor: isError ? "red" : borderColor,
                   }}
                   disabled = {isDisabled} 
                   required={isRequired}
                   max={maxDate}
                   min={minDate}
                   onChange={(e)=>{
                    const inputValue = e.target.value;
                    const parsedDate = parse(inputValue, 'yyyy-mm-dd', new Date());
                    if(inputValue && parsedDate && !Number.isNaN(parsedDate.getTime())){
                        handleSelect(format(parsedDate,'yyyy-mm-dd'))
                    }else{
                        isError = true;
                    }
                   }}
                   
                   />
                {label && labelPosition === "right" && <label className={`date-label ${classname}`}>{label}</label>}
            </div>
            }
            {/* {state.selectedValue} */}
        </div>
    )
}