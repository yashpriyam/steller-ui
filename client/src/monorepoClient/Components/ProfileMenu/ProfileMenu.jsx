import React, { useContext, useRef, useState } from 'react'
import './ProfileMenu.scss'
import defaultAvatar from "../../assets/images/avatar2.svg"
import useClickOutside from '../../CustomHooks/useClickOutside';
import { ThemeContext } from '../Themecontext/ThemeContext';
import ImageComponent from '../ImageComponent/ImageComponent';
import { AppStateContext } from '../../AppState/appState.context';
import { NameIcon } from '../../../icons/index';

const ProfileMenu = ({ options = [], image = defaultAvatar}) => {
    const [isDropdownHidden, setIsDropdownHidden] = useState(true);
    const { darkMode } = useContext(ThemeContext);
    const { userData } = useContext(AppStateContext);
    const ref = useRef();
    useClickOutside(ref, () => setIsDropdownHidden(true));
    const { name, profileImage } = userData || {};
    const { secureUrl } = profileImage || {};
  return (
    <div onClick={() => setIsDropdownHidden(!isDropdownHidden)} className={`profileMenuContainer ${darkMode && "profileMenuBgDark"}`}>
      {
        Boolean(userData) ? 
          secureUrl ?
            <ImageComponent
              src={secureUrl}
              alt=""
              className="containerImage"
              onClick={() => setIsDropdownHidden(!isDropdownHidden)}
            />
            : <NameIcon height='fit-content' width='fit-content' name={name}/> 
        : (
          <ImageComponent
            src={image}
            alt=""
            className="containerImage"
            onClick={() => setIsDropdownHidden(!isDropdownHidden)}
          />
        )
      }
      {!isDropdownHidden && (
        <div
          className={`optionsContainer ${darkMode && "optionsContainer-dark"}`}
        >
          {options.map(({ value, onClick = () => {} }) => (
            <div
              onClick={onClick}
              className={`dropdownOptions ${darkMode && "dropdownOptionsDark"}`}
            >
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProfileMenu