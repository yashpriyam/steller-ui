import React, { useRef, useState } from "react";
import "./accordion.scss";
import useThrottle from "../../hooks/useThrottle";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";
import ArrowIcon from "../../icons/ArrowIcon";

interface AccordionProps {
  children?: React.ReactNode;
  title?: React.ReactNode | string;
  className?: string;
  style?: object;
  openBy?: "icon" | "div";
  icon?: React.ReactNode;
  iconPosition?: "left" | "center" | "right";
  openOnClick?: boolean;
  openOnHover?: boolean;
  disabled?: boolean;
  // isOpenDefault?: boolean;  need to discuss these three features with Yash sir
  // loaderComponent?: React.ReactNode;
  // noDataComponent?: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  title,
  className,
  style = {},
  openBy = "div",
  icon = <ArrowIcon />,
  iconPosition = "right",
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState(false);
  const accordionRef = useRef<HTMLDivElement | null>(null);
  
  const toggleAccordion = useThrottle(() => setIsOpen(!isOpen), 500);
  useOnOutsideClick(accordionRef, () => setIsOpen(false));

  return (
    <div ref={accordionRef} className={`accordion ${className}`} style={style}>
      <div
        className="accordion-header"
        onClick={() => {
          if (openBy === "icon") return;
          toggleAccordion();
        }}
      >
        <div>{title}</div>
        <span
          tabIndex={1}
          className={`drop-down-icon ${isOpen && "drop-up-icon"}`}
          onClick={() => {
            if (openBy === "div") return;
            toggleAccordion();
          }}
        >
          {icon}
        </span>
      </div>
      <div
        className={`accordion-content ${
          isOpen ? "open-accordion" : "closed-accordion"
        }`}
      >
        <div className="content-wrapper">
          {children ? children : <h2>NO DATA !!!</h2>}
        </div>
      </div>
    </div>
  );
};
