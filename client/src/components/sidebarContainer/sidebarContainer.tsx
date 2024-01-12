import React from 'react';
import './sidebarContainer.scss';

export const SidebarContainer = ({
    heading,
    children
}: SidebarContainerProps) => {
    return (
        <div className='sidebar-container-wrapper'>
            <div className='sidebar-container-heading'>
                { heading }
            </div>
            <div className='sidebar-container-children'>
                {children}
            </div>
        </div>
    )
}