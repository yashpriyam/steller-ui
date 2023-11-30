import React, { useState } from "react";
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
  avtarIcon = "https://img.icons8.com/pastel-glyph/30/person-male--v3.png",
}: NavbarProps) => {
  const navbarDirectionMap: Record<string, string> = {
    right: "navbar-container-direction-right",
    left: "navbar-container-direction-left",
  };

  return (
    <div
      className={`navbar-container ${navbarDirectionMap[direction]} ${className}`}
    >
      <div className="icon-container">
        <img src={icon} alt={"WM"} />
      </div>
      <div className={`options-container-nav ${className}`}>
        <OptionComponent options={options} />
      </div>
      <div className="avtar-icon">
        <img
          src={avtarIcon}
          alt="person-male--v3"
        />
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
    return <div className={`options-container ${className}`}>
        
        {
            options?.map((option, index) => {
                return (
                  <div
                    className={`option-container ${className}`}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                      onClickFunction(e, index)
                    }
                  >
                    <span className="option-data">
                      <span className="left-option-icon">
                        {option.url && <img src={option.url} />}
                      </span>
                      <span>{option.text}</span>
                    </span>
                    <span
                      className={`${
                        isActive === index ? "isactive-option" : "slide-bar"
                      }`}
                    ></span>
                  </div>
                );
                
            })
        }
        
  </div>;
};
