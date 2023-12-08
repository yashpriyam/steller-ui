import React, { useRef, useState } from "react";
import "./accordion.scss";
import useThrottle from "../../hooks/useThrottle";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";
import ArrowIcon from "../../icons/ArrowIcon";

interface AccordionProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  style?: object;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  title,
  className,
  style = {},
}: AccordionProps) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleAccordion = useThrottle(()=> setIsOpen(!isOpen), 500);
  const accordionRef = useRef<HTMLDivElement | null>(null);
  useOnOutsideClick(accordionRef, () => setIsOpen(false));
  
  return (
    <div ref={accordionRef} className={`accordion ${className}`} style={style}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <h2>{title}</h2>
        <span className={`drop-down-icon ${isOpen && "drop-up-icon"}`}>
          <ArrowIcon />
        </span>
      </div>
      <div
        className={`accordion-content ${
          isOpen ? "open-accordion" : "closed-accordion"
        }`}
      >
        <div className="content-wrapper">{children}</div>
      </div>
    </div>
  );
};
