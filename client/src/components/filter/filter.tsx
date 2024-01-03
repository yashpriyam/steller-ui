import React from "react";
import { checkboxDataList } from "../../pages/scheduling/accordionDataList";
import "./filter.scss";
interface FilterProps {
  className?: string;
  checkboxData?: string[];
  style?: object;
}
export const Filter : React.FC<FilterProps> = ({
    className,checkboxData=checkboxDataList,style,
} : FilterProps)=>{
    return (
      <div className={`scheduling-page-filter-container ${className}`} style={style}>
        <div className="filter-sub-container">
          <label className="filter-heading">Filter</label>
          <div className="checkbox-content">
            {checkboxData.map((option) => (
              <div className="checkbox-wrapper">
                <input className="checkbox-input" type="checkbox" id={option} />
                <label className="checkbox label" htmlFor={option}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}