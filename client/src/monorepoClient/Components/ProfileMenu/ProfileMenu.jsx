import React, { useContext, useRef, useState } from 'react'
import './ProfileMenu.scss'
import defaultAvatar from "../../assets/images/avatar2.svg"
import useClickOutside from '../../CustomHooks/useClickOutside';
import { ThemeContext } from '../Themecontext/ThemeContext';
import ImageComponent from '../ImageComponent/ImageComponent';

const ProfileMenu = ({ options = [], image = defaultAvatar}) => {
    const [isDropdownHidden, setIsDropdownHidden] = useState(true);
    const { darkMode } = useContext(ThemeContext);

    const ref = useRef();
    useClickOutside(ref, ()=> setIsDropdownHidden(true));
  return (
    <div className={`profileMenuContainer ${darkMode && 'profileMenuBgDark'}`}>
        <ImageComponent src={image} alt="" className='containerImage' onClick={()=> setIsDropdownHidden(!isDropdownHidden)} />
       {
        !isDropdownHidden && (<div className='optionsContainer'>
        {
            options.map(({ value, onClick = ()=>{}})=> <div onClick={onClick} className={`dropdownOptions ${darkMode && 'dropdownOptionsDark'}`} >{value}</div>)
        }
    </div>)
       }
    </div>
  )
}

export default ProfileMenu