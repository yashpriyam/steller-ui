import React from 'react'
import "./StepTextSelector.scss";
const StepTextSelector = ({
  index,
  className,
  children,
  onClick,
  formStep,
  showActive = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${className} ${
        formStep === index + 1 && "black"
      } ${showActive&& "showActive"} StepTextSelector`}
    >
      <div className="number">
        <span>{index + 1}</span>
      </div>
      <span className="text">{children}</span>
    </div>
  );
};

export default StepTextSelector
