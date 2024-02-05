import React, { useState } from 'react'
import './sidebar.scss';
import { SidebarOption } from '../sidebarOption/sidebarOption';
import { SidebarContainer } from '../sidebarContainer/sidebarContainer';
import { useNavigate } from 'react-router-dom';
import { LogOutIcon, LeftArrowIcon } from '../../icons/index';

export const Sidebar = ({
    options = [],
    optionAtLast,
    optionsAtFirst,
    profile,
    admin
}: SidebarProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const navigate = useNavigate();
    const lastOption = optionAtLast && (
        <SidebarOption showText={isOpen} text={optionAtLast.text} image={<LogOutIcon
            isDarkMode={true} />} />)
    const onOptionClick = (url: string = "", openNewPage: boolean) => {
        if (openNewPage) {
            window.open(url, "_blank");
        } else if(url) {
            navigate(url)
        }
    }   
    return (
      <div
        className="sidebar-main-container"
      >
        <div
          className={`sidebar-arrow-icon ${!isOpen && "left-side-arrow"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <LeftArrowIcon />
        </div>
        <div className="sidebar-main-sub-container">
          <div
            className={`sidebar-first-options-container ${
              !isOpen && "sidebar-options-container-flex"
            }`}
          >
            {profile && (
              <SidebarOption
                image={profile.image}
                text={profile.text}
                isProfile={true}
                showText={isOpen}
                url={profile.url}
                moreInfo={profile.moreInfo}
                onClick={() =>
                  onOptionClick(profile.url, Boolean(profile.openNewPage))
                }
              />
            )}
            {
              admin && (
                <SidebarOption
                image={admin.image}
                text={admin.text}
                isProfile={false}
                showText={isOpen}
                url={admin.url}
                onClick={() =>
                  onOptionClick(admin.url, Boolean(admin.openNewPage))
                }
              />
              )
            }
             
            {optionsAtFirst?.map((data, idx) => {
              const { image, text, onClick, openNewPage, url, isProfile } =
                data;
              return (
                <SidebarOption
                  key={idx}
                  image={image}
                  text={text}
                  onClick={() => onOptionClick(url, Boolean(openNewPage))}
                  url={url}
                  showText={isOpen}
                  isProfile={isProfile}
                />
              );
            })}
          </div>
          <SidebarContainer>
            <div
              className={`sidebar-middle-options-container ${
                !isOpen && "sidebar-options-container-flex"
              }`}
            >
              {options.map((data, index) => {
                return (
                  <SidebarOption
                    onClick={() =>
                      onOptionClick(data.url, Boolean(data.openNewPage))
                    }
                    key={index}
                    showText={isOpen}
                    text={data.text}
                    image={data.image}
                    url={data.url}
                  />
                );
              })}
            </div>
            <div
              className="sidebar-last-option-btn sidebar-btn-mobile-view"
              onClick={optionAtLast?.onClick}
            >
              {lastOption}
            </div>
          </SidebarContainer>
        </div>
        <div
          className={`sidebar-last-option-btn ${
            !isOpen && "sidebar-options-container-flex"
          }`}
          onClick={optionAtLast?.onClick}
        >
          {lastOption}
        </div>
      </div>
    )
}