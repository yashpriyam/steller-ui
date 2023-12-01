import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import "./navbar.scss";


interface NavbarProps {
  className?: string;
  icon?: string;
  options?: {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    text?: string;
      url?: string;
    }[];
    avtarIcon?:string
  direction?: "right" | "left";
}

export const Navbar: React.FC<NavbarProps> = ({
  className,
  icon = "http://localhost:3000/static/media/Logo.68860f31b9df8fed08edea34af2f9ae8.svg",
  options = [
    {
      onClick: (e: React.MouseEvent<HTMLDivElement>) => {},
      text: "Home",
      url: "",
    },
  ],
  direction = "right",
  avtarIcon = "https://img.icons8.com/pastel-glyph/person-male--v3.png",
}: NavbarProps) => {
    const [showMediaIcons,setShowMediaIcons]=useState<boolean>(false)
  const navbarDirectionMap: Record<string, string> = {
    right: "navbar-container-direction-right",
    left: "navbar-container-direction-left",
  };

  return (
    <div
      className={`navbar-container ${navbarDirectionMap[direction]} ${className}`}
    >
      <div className="icon-container">
        <img className="application-icon-bar" src={icon} alt={"WM"} />
      </div>
      <div className={`${
            showMediaIcons
              ? "mobile-view-options-container"
              :"options-avtar-wrapper"}`}>
        <div
          className={`options-container ${className}`}
        >
          <OptionComponent options={options} />
        </div>
        {<div className="avtar-icon-container">
          <img className="avtar-icon" src={avtarIcon} alt="" />
        </div>}
      </div>
      <div
        className="menu-icon-bar"
        onClick={() => setShowMediaIcons(!showMediaIcons)}
      >
        <GiHamburgerMenu className="menu-icon" />
      </div>
    </div>
  );
};

interface OptionProps {
  options?: {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    text?: string;
    url?: string;
  }[];
    className?: string;
}

const OptionComponent: React.FC<OptionProps> = ({ options ,className
}: OptionProps) => {
 const [isActive, setActive] = useState<number>(0);

    const onClickFunction = (e: React.MouseEvent<HTMLDivElement>,index:number) => {
     setActive(index)
 };
    return <>        
        {
            options?.map((option, index) => {
                return (
                  <div
                    className={`option-container ${className}`}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                      onClickFunction(e, index)
                    }
                  >
                    <div className="option-data">
                        {option.url && <img className="navbar-option-icon" src={option.url} alt="" />}
                      <div className="navbar-option-text">{option.text}</div>
                    </div>
                    <div
                      className={`${
                        isActive === index ? "active-slide-option" : "inactive-slide-option"
                      }`}
                        >
                            <div className="progress-line"></div>
                    </div>
                  </div>
                );
                
            })
        }
        </>
        
};
