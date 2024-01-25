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
  isProfile=false,
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
      className={`sidebar-option-container 
        ${focusOnOption && "sidebar-option-container-focus"}
        ${isProfile && "sidebar-option-container-profile"}
        ${!showText && "sidebar-option-container-closed"}
      `}
    >
      <div className="sidebar-option-img-text-wrapper">
        {React.isValidElement(image) ? (
          <span
            className={`sidebar-option-img ${
              isProfile && "sidebar-profile-image"
            } ${showText && "sidebar-option-img-small"}`}
          >
            {image}
          </span>
        ) : (
          <img
            className={`sidebar-option-img ${
              isProfile && "sidebar-profile-image"
            } ${showText && "sidebar-option-img-small"}`}
            src={typeof image === "string" ? image : ""}
            alt=""
          />
        )}
        <span
          className={`${
            showText
              ? `option-text ${isProfile && "profile-option-text"}`
              : "hovered-option-text"
          }`}
        >
          {text}
        </span>
        <span className={`option-text-mobile-view`}>{text}</span>
      </div>
      <div
        className={`item-count-wrapper ${
          !showText && "item-count-wrapper-none"
        }`}
      >
        {showText && count !== undefined && (
          <span className="item-count">{count}</span>
        )}
      </div>
    </div>
  );
}