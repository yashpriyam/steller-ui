import React, { useState } from 'react'
import './accordion.scss';
import dropdownArrow from "../../icons/accordionArrow.png"

interface AccordionProps {
  title?: string;
  children?: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div onClick={(e) => { setIsOpen(!isOpen); e.stopPropagation() }} className='accordion-container'>
      <div className='accordion-title'>
        {title}
        <img className={`accordion-dropdown-arrow ${isOpen && 'accordion-dropdown-arrow-active'}`} src={dropdownArrow} alt="" />
      </div>
      <div className={`accordion-children ${isOpen && 'open-accordion'}`}>
        {children}
      </div>
    </div>
  )
}

export default Accordion