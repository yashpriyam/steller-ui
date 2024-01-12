import React, { useState } from 'react'
import './sideBar.scss';
import { SidebarOption } from '../sidebarOption/sidebarOption';
import { SidebarContainer } from '../sidebarContainer/sidebarContainer';
import { useNavigate } from 'react-router-dom';
import { LogOutIcon, LeftArrowIcon } from '../../icons/index';

export const SideBar = ({
    options = [],
    optionAtLast
}: SidebarProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const navigate = useNavigate();
    return (
        <div className='sidebar-main-container'>
            <div className={`sidebar-arrow-icon ${!isOpen && 'left-side-arrow'}`} onClick={() => setIsOpen(!isOpen)}> <LeftArrowIcon /> </div>
            <div className='sidebar-main-sub-container'>
                <SidebarContainer>
                    {
                        options.map((data, index) => {
                            return <SidebarOption onClick={() => navigate(data.url)} key={index} showText={isOpen} text={data.text} image={data.image} />
                        })
                    }
                </SidebarContainer>
            </div>
            {
                optionAtLast && (<div onClick={optionAtLast.onClick}>
                    <SidebarOption showText={isOpen} text={optionAtLast.text} image={<LogOutIcon
                        isDarkMode={true} />} />
                </div>)
            }
        </div>
    )
}