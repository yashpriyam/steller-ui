import "./drawer.scss";
import { useState, useRef } from "react";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";

interface DrawerProps {
  direction?: "left" | "right" | "top" | "bottom";
  isOpen?: true | false;
  className?: string;
  icon?: string;
  style?: object;
  options?: {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    text: string;
    url: string;
  }[];
}

export const Drawer: React.FunctionComponent<DrawerProps> = ({
  direction = "right",
  isOpen = false,
  options,
  className,
  style,
  icon
}: DrawerProps) => {
  const drawerContainerMap: Record<string, string> = {
    left: "drawer-left-open",
    right: "drawer-right-open",
    top: "drawer-top-open",
    bottom: "drawer-bottom-open",
  };
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(isOpen);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  useOnOutsideClick(drawerRef, () => setIsOpenDrawer(false));
  return (
    <>
      {isOpenDrawer && (
        <div
          ref={drawerRef} style={style}
          className={`drawer-container ${drawerContainerMap[direction]} ${className}`}
        >
          <div  className="web-master-icon-container">
            <img className="web-master-icon"
              src={icon}
              alt=""
            />
          </div>
          {options?.map((option, index) => {
            return (
              <div className="drawer-option" onClick={option.onClick}>
                <span className="drawer-option-icon">
                  {option.url && <img src={option.url} alt="" />}
                </span>
                <span className="drawer-option-text">{option.text}</span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
