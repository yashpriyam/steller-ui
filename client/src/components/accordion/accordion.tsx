import React, { useState } from 'react';
import './accordion.scss';
import dropdownArrow from '../../icons/accordionArrow.png';

interface AccordionProps {
  title?: string;
  children?: React.ReactNode;
  style?: object;
}

const Accordion: React.FC<AccordionProps> = ({
  title=" ",
  children,
  style,
}: AccordionProps) => {
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
        <div>{title}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18"
          width="12"
          viewBox="0 0 320 512"
          className={`accordion-dropdown-arrow ${
            isOpen && "accordion-dropdown-arrow-active"
          }`}
        >
          
          <path fill='white' d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
        </svg>
      </div>
      <div
        className={`accordion-content ${
          isOpen ? 'open-accordion' : 'closed-accordion'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
