import React from 'react'
import './sidebarOption.scss';

export const SidebarOption = ({
  showText,
  text,
  image,
  count,
  onClick = () => {}
}: SidebarOptionInterface) => {
  return (
    <div tabIndex={1} onClick={onClick} className='sidebar-option-container'>
      {
        React.isValidElement(image)
        ? (image)
        : (<img className='sidebar-option-img' src={typeof image === "string" ? image : ""} alt="" />)
      }
      <span className={`${showText ? 'option-text' : 'hovered-option-text'}`}>{text}</span>
      {
       showText && count !== undefined && <span className='item-count'>{count}</span>
      }
    </div>
  )
}