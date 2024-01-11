import { filterDataList } from "../../pages/videosPage/dataList";
import React, { MouseEventHandler } from "react";
import "./filterTags.scss";
interface FilterTagsProps {
  className?: string;
  filterData?: { tag: string }[];
  filterTag?: string;
  setFilterTag: (value: string) => void;
}

export const FilterTags: React.FC<FilterTagsProps> = ({
  className,
  filterData = filterDataList,
  setFilterTag,
  filterTag,
}: FilterTagsProps) => {
  const handleClickOnApplyFilter: MouseEventHandler<HTMLSpanElement> = (
    event
  ) => {
    const target = event.target as HTMLElement;
    if (target instanceof HTMLElement) {
      const innerTextValue: string = target.innerText;
      setFilterTag(innerTextValue);
    }
  };

  const handleClickOnClearFilter = () => {
    setFilterTag("");
  };
  return (
    <div className={`filter-container ${className}`}>
      <div className="filter-wrapper">
        {filterData?.map((data) => {
          return (
            <span
              className={`filter-tag ${
                data.tag === filterTag ? "active-tag" : ""
              }`}
              onClick={handleClickOnApplyFilter}
            >
              {data.tag}
            </span>
          );
        })}
        {filterData.length && (
          <span className="clear-filter" onClick={handleClickOnClearFilter}>
            Clear
          </span>
        )}
      </div>
    </div>
  );
};