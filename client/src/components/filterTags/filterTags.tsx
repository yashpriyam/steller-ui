import React, { MouseEventHandler } from "react";
import "./filterTags.scss";
import { useTranslation } from "react-i18next";

export const FilterTags: React.FC<FilterTagsProps> = (props) => {
  const { className, setFilterTag, filterTagMap = {}, onClearAll } = props;
  const { t } = useTranslation();

  const handleClickOnApplyFilter: MouseEventHandler<HTMLSpanElement> = (
    event
  ) => {
    const target = event.target as HTMLElement;
    if (target instanceof HTMLElement) {
      const innerTextValue: string = target.innerText;
      setFilterTag(innerTextValue);
    }
  };

  return (
    <div className={`filter-container ${className}`}>
      <div className="filter-wrapper">
        {filterTagMap &&
          Object.keys(filterTagMap).map((tag: string) => (
            <span
              key={tag}
              className={`filter-tag ${filterTagMap[tag] && "active-tag"}`}
              onClick={handleClickOnApplyFilter}
            >
              {tag}
            </span>
          ))}
        {onClearAll && (
          <span className="clear-filter" onClick={onClearAll}>
            {t("clear")}
          </span>
        )}
      </div>
    </div>
  );
};
