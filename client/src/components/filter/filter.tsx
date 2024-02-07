import React, { Dispatch, SetStateAction, useState } from "react";
import "./filter.scss";
import { SortIcon } from "../../icons/index";
import { Checkbox } from "../../components/checkbox/checkbox";
import { SortDirection } from "../../utils/index";
interface FilterProps {
  className?: string;
  style?: object;
  filter?: GetScheduleDataType;
  setFilter?: Dispatch<SetStateAction<GetScheduleDataType>>;
}
export const Filter: React.FC<FilterProps> = ({
  className,
  style,
  filter,
  setFilter = () => { }
}: FilterProps) => {
  const { asc, desc } = SortDirection();
  const [sortOrder, setSortOrder] = useState("desc")
  const checkboxData: CheckboxValueType[] = [{ text: "some text", value: "1" }];
  const [isSortActive, setIsSortActive] = useState<boolean>(true);

  const handleSortButon = async () => {
    const newSortOrder = sortOrder === desc ? asc : desc;
    setSortOrder(newSortOrder);
    setFilter({ ...filter, sortdata: { sortBy: "date", sortOrder: newSortOrder } });
    setIsSortActive(!isSortActive);
  }

  return (
    <div
      className={`scheduling-page-filter-container ${className}`}
      style={style}
    >
      {/* <div className="checkbox-content filter-right-border-style">
          {checkboxData && <Checkbox type="multi" options={checkboxData}/>}
        </div> */}
      {
        //TO-DO @sujal
      }
      <div className={`sort-by-date-wrapper ${isSortActive && "sort-by-date-wrapper-active"}`} onClick={handleSortButon}>
        <SortIcon isDarkMode={true} width="20px" height="20px" />
        <span className="sort-by-date-text">Date</span>
      </div>
    </div>
  );
};