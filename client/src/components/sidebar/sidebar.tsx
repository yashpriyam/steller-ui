import React, { useState } from 'react'
import './sidebar.scss';
import { SidebarOption } from '../sidebarOption/sidebarOption';
import { SidebarContainer } from '../sidebarContainer/sidebarContainer';
import { useNavigate } from 'react-router-dom';
import { LogOutIcon, LeftArrowIcon } from '../../icons/index';

export const Sidebar = ({
    options = [],
    optionAtLast
}: SidebarProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const navigate = useNavigate();
    const lastOption = optionAtLast && (
        <SidebarOption showText={isOpen} text={optionAtLast.text} image={<LogOutIcon
            isDarkMode={true} />} />)
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
                    <div className='sidebar-last-option-btn sidebar-btn-mobile-view' onClick={optionAtLast?.onClick}>
                {lastOption}
            </div>
                </SidebarContainer>
            </div>
            <div className='sidebar-last-option-btn' onClick={optionAtLast?.onClick}>
                {lastOption}
            </div>
        </div>
    )
}