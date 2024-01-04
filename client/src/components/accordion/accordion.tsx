import React, { MouseEventHandler, useState, useRef } from "react";
import "./accordion.scss";
import DropDownIcon from "../../icons/dropDownIcon";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";

interface AccordionProps {
  className?: string;
  title?: string;
  children?: React.ReactNode;
  style?: object;
  icon?: React.ReactNode | string;
  closeOnOutsideClick?: boolean;
  iconPosition?: "left" | "center" | "right";
  titlePosition?: "left" | "center" | "right";
  disabled?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  className,
  title,
  children,
  style,
  icon = <DropDownIcon />,
  closeOnOutsideClick = false,
  iconPosition = "right",
  titlePosition = "left",
  disabled = false,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const accordionRef = useRef<HTMLDivElement | null>(null);
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!disabled) setIsOpen(!isOpen);
    e.stopPropagation();
  };
  useOnOutsideClick(
    accordionRef,
    closeOnOutsideClick ? () => setIsOpen(false) : () => {}
  );
  const iconClass: string = `accordion-dropdown-arrow position-${iconPosition} ${
    isOpen && "accordion-dropdown-arrow-active"
  }`;

  return (
    <div
      className={`accordion-container ${
        disabled && "disable-accordion"
      } ${className}`}
      style={style}
      ref={accordionRef}
    >
      <div className="accordion-header" onClick={handleClick}>
        {title && (
          <div className={`accordion-title position-${titlePosition}`}>
            {title}
          </div>
        )}

        {React.isValidElement(icon) ? (
          <span className={iconClass}>{icon}</span>
        ) : (
          <img className={`image ${iconClass}`} src={`${icon}`} alt="altText" />
        )}
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