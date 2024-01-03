import React, { useState } from "react";
import "./accordion.scss";
import DropDownIcon from "../../icons/dropDownIcon";

interface AccordionProps {
  title?: string;
  children?: React.ReactNode;
  style?: object;
  icon?: React.ReactNode;
  iconPosition?: "left" | "center" | "right";
  titlePosition?: "left" | "center" | "right";
}

const Accordion: React.FC<AccordionProps> = ({
  title = "Title",
  children,
  style,
  icon = <DropDownIcon />,
  iconPosition = "right",
  titlePosition = "left",
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="accordion-container" style={style}>
      <div
        className="accordion-header"
        onClick={(e) => {
          setIsOpen(!isOpen);
          e.stopPropagation();
        }}
      >
        {title && (
          <div className={`accordion-title position-${titlePosition}`}>{title}</div>
        )}
        <span
          className={`accordion-dropdown-arrow position-${iconPosition} ${
            isOpen && "accordion-dropdown-arrow-active"
          }`}
        >
          {icon}
        </span>
      </div>
      <div
        className={`accordion-content ${
          isOpen ? "open-accordion" : "closed-accordion"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
