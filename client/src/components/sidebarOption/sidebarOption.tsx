import React, { useEffect, useState } from 'react'
import './sidebarOption.scss';
import { useLocation } from 'react-router-dom';

export const SidebarOption = ({
  showText,
  text,
  image,
  count,
  onClick = () => {},
  url,
}: SidebarOptionInterface) => {
  const [focusOnOption, setFocusOnOption] = useState<boolean>(false);
  const {pathname} = useLocation();
  useEffect(()=>{
    setFocusOnOption(pathname===url)
  },[pathname])
  return (
    <div
      tabIndex={1}
      onClick={onClick}
      className={`sidebar-option-container ${
        focusOnOption && "sidebar-option-container-focus"
      }`}
    >
      <div className="sidebar-option-img-text-wrapper">
        {React.isValidElement(image) ? (
          image
        ) : (
          <img
            className="sidebar-option-img"
            src={typeof image === "string" ? image : ""}
            alt=""
          />
        )}
        <span className={`${showText ? "option-text" : "hovered-option-text"}`}>
          {text}
        </span>
      </div>
      <div className={`item-count-wrapper ${!showText && "item-count-wrapper-none"}`}>
        {showText && count !== undefined && (
          <span className="item-count">{count}</span>
        )}
      </div>
    </div>
  )
}