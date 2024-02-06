import React, { useState } from "react";
import "./filter.scss";
import { SortIcon } from "../../icons/index";
import { Checkbox } from "../../components/checkbox/checkbox";
interface FilterProps {
  className?: string;
  style?: object;
  filter?: string[];
  setFilter?: (value: string[]) => {};
}
export const Filter: React.FC<FilterProps> = ({
  className,
  style,
  filter,
  setFilter
}: FilterProps) => {
  
  const checkboxData : CheckboxValueType[] =[{text: "some text", value: "1"}];
  const [isSortActive, setIsSortActive] = useState<boolean>(false);
  return (
    <div
      className={`scheduling-page-filter-container ${className}`}
      style={style}
    >
        <div className="checkbox-content filter-right-border-style">
          {checkboxData && <Checkbox type="multi" options={checkboxData}/>}
        </div>
       <div className={`sort-by-date-wrapper ${isSortActive && "sort-by-date-wrapper-active"}`} onClick={()=>setIsSortActive(!isSortActive)}>
         <SortIcon isDarkMode={true} width="20px" height="20px" fillColor="rgb(14,114,177)"/>
        <span>Date</span>
        </div>
      </div>
  );
};