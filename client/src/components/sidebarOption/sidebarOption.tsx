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
    <div onClick={onClick} className='sidebar-option-container'>
      {
        React.isValidElement(image)
        ? (image)
        : (<img className='sidebar-option-img' src={typeof image === "string" ? image : ""} alt="" />)
      }
      { showText && <span className='option-text'>{text}</span> }
      {
       showText && count !== undefined && <span className='item-count'>{count}</span>
      }
    </div>
  )
}