import React from "react";
import "./Button.scss";
const ButtonComponent = ({ className, children, ...props }) => {
  return (
    <>
      <button {...props} className={`defaultClass ${className}`}>
        {children}
      </button>
    </>
  );
};

export { ButtonComponent };
