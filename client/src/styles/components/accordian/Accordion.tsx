import React, { useState } from "react";
import "./accordion.scss";
import dropDownIcon from "../../../icons/drop-down-icon.svg";
import useThrottle from "../../../hook/useThrottle";

interface AccordionProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  style?: object;
}

export const AccordionComp: React.FC<AccordionProps> = ({
  children = <></>,
  title = "Title",
  className = "",
  style = {},
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = useThrottle(function () {
    setIsOpen(!isOpen);
  }, 500);

  return (
    <div className={`accordion ${className}`} style={style}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <h2>{title}</h2>
        <img
          src={dropDownIcon}
          alt="icon"
          className={`drop-down-icon ${isOpen && "drop-up-icon"}`}
        />
      </div>
      <div className={`accordion-content ${isOpen ? "open" : "closed"}`}>
        <div className="content-wrapper">{children}</div>
      </div>
    </div>
  );
};
