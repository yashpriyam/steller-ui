import "./tab.css";
import { TabProps } from "./type";

export const Tab: React.FC<TabProps> = (props: TabProps) => {
  const {
    label,
    onClick,
    style,
    value,
    disabled=false,
    className,
    selectedClass,
    isSelected=false,
    index,
  } = props;
  return (
    <div
      role="tab"
      style={style}
      onClick={disabled ? ()=>{} : onClick}
      className={`tab-main-container ${className} ${
        !disabled && isSelected && (selectedClass ? selectedClass : "selected-tab-container")
      } ${disabled && "tab-main-container-disabled"}`}
      id={`${index}`} 
    >
      {label ?? value}
    </div>
  );
};
