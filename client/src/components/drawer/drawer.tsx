import "./drawer.scss";
import { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";

interface DrawerProps {
  className?: string;
  direction?: "left"|"right"|"top"|"bottom";
  isOpen?: true|false;
  style?: object;
  options?: {
    onClick: (e:React.MouseEvent<HTMLDivElement>) => void;
    text: string;
    url: string;
  }[];
}

export const Drawer: React.FunctionComponent<DrawerProps> = ({
  direction = "top",
  options,
  className,
  isOpen = false,
  style,
}: DrawerProps) => {
  const drawerContainerMap: Record<string, string> = {
    left: "drawer-left-open",
    right: "drawer-right-open",
    top: "drawer-top-open",
    bottom: "drawer-bottom-open",
    };
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
    const onClickFun = () => {
        setIsOpenDrawer(!isOpenDrawer)
    }
  return (
      <div className={`drawer-wrapper-container ${className}`}>
          <div className="drawer-toggle-button" onClick={onClickFun}><GiHamburgerMenu/></div>
      {isOpenDrawer&&<div
        className={`drawer-container ${drawerContainerMap[direction]} ${className}`}
      >
        {options?.map((option, index) => {
          return (
            <div className="drawer-option" onClick={option.onClick}>
              <span className="drawer-option-icon">
                <img src={option.url} alt="" />
              </span>
              <span className="drawer-option-text">{option.text}</span>
            </div>
          );
        })}
      </div>}
    </div>
  );
};

