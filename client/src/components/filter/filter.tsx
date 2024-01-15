import React from "react";
import "./filter.scss";
interface FilterProps {
  className?: string;
  checkboxData?: string[];
  style?: object;
  filter?: string[];
  setFilter?: (value: string[]) => {};
}
export const Filter: React.FC<FilterProps> = ({
  className,
  checkboxData=[],
  style,
  filter,
  setFilter
}: FilterProps) => {
  
  return (
    <div
      className={`scheduling-page-filter-container ${className}`}
      style={style}
    >
      <div className="filter-sub-container">
        <label className="filter-heading">Filter</label>
        <div className="checkbox-content">
          {checkboxData.map((option) => (
            <div className="checkbox-wrapper">
              <input className="checkbox-input" type="checkbox" id={option} />
              <label className="checkbox-label" htmlFor={option}>
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};