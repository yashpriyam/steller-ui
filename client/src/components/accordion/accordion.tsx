import React, { useState } from 'react'
import './accordion.scss';
import dropdownArrow from "../../icons/accordionArrow.png"

interface AccordionProps {
  title?: string;
  children?: React.ReactNode;
  style?: object;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, style }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="accordion-container" style={style}>
      <div
        className="accordion-title"
        onClick={(e) => {
          setIsOpen(!isOpen);
          e.stopPropagation();
        }}
      >
        {/* {title} */}
        <img
          className={`accordion-dropdown-arrow ${
            isOpen && "accordion-dropdown-arrow-active"
          }`}
          src={dropdownArrow}
          alt=""
        />
      </div>
      <div className={`accordion-content ${
          isOpen ? "open-accordion" : "closed-accordion"
        }`}>
        {children}
      </div>
    </div>
  );
}

export default Accordion