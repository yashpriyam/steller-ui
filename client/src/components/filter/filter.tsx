import React, { Dispatch, SetStateAction, useState } from "react";
import "./filter.scss";
import { SortIcon } from "../../icons/index";
import { Checkbox } from "../../components/checkbox/checkbox";
import { sortDirection, weekSortBy } from "../../utils/index";
import { useTranslation } from "react-i18next";
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
  const { asc, desc } = sortDirection;
  const [sortOrder, setSortOrder] = useState(desc)
  const [isSortActive, setIsSortActive] = useState<boolean>(true);
  const { t } = useTranslation();
  const handleSortButon = async () => {
    const newSortOrder = sortOrder === desc ? asc : desc;
    setSortOrder(newSortOrder);
    setFilter({ ...filter, sortData: { sortBy: weekSortBy.date, sortOrder: newSortOrder } });
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
        <span className="sort-by-date-text">{t("date")}</span>
      </div>
    </div>
  );
};