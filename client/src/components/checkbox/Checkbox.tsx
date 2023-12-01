import React, { useState } from "react";

interface CheckboxProps {
  className?: string;
  options?: string[];
  onSelect?: (currentSelected: string, selectedValues: string[]) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className = "",
  options=[],
  onSelect=()=>{},
}) => {
  const [selectedIndexList, setSelectedIndexList] = useState<number[]>([]);

  const handleCheckboxChange = (
    e: any,
    index: number
  ) => {
    console.log(e.target.checked);
    
    const isSelected = selectedIndexList.includes(index);
    console.log({isSelected});
    
    let updatedIndexes: number[];

    if (isSelected) {
      updatedIndexes = selectedIndexList.filter((i) => i !== index);
    } else {
      updatedIndexes = [...selectedIndexList, index];
    }

    setSelectedIndexList(updatedIndexes);

    const selectedValues = updatedIndexes.map((i) => options[i]);
    onSelect(options[index], selectedValues);
  };

  return (
    <div className={`checkbox-container ${className}`}>
      {options.map((option, index) => (
        <label key={index} className="checkbox-label">
          <input
            type="checkbox"
            // checked={selectedIndexList.includes(index)}
            onChange={(e) => handleCheckboxChange(e,index)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default Checkbox;
