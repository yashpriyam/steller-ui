import { filterDataList } from "../../pages/videos/dataList";
import React, { MouseEventHandler } from "react";

interface FilterTagsProps {
  className?: string;
  filterData?: { tag: string }[];
}

export const FilterTags: React.FC<FilterTagsProps> = ({
  className,
  filterData=filterDataList,
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
      <div className="filter-container">
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
}