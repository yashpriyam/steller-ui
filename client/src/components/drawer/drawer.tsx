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
  icon,
}: DrawerProps) => {
  const drawerContainerMap: Record<string, string> = {
    left: "drawer-left-open",
    right: "drawer-right-open",
    top: "drawer-top-open",
    bottom: "drawer-bottom-open",
  };
  const drawerCloseMap: Record<string, string> = {
    left: "drawer-left-close",
    right: "drawer-right-close",
    top: "drawer-top-close",
    bottom: "drawer-bottom-close",
  };
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(isOpen);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  useOnOutsideClick(drawerRef, () => setIsOpenDrawer(false));
  return (
    <>
      {
        <div
          ref={drawerRef}
          style={style}
          className={`drawer-container ${drawerContainerMap[direction]} ${
            !isOpenDrawer && drawerCloseMap[direction]
          } ${className}`}
        >
          <div className="drawer-icon-container">
            <img className="drawer-icon" src={icon} alt="" />
          </div>
          {options?.map((option, index) => {
            return (
              <div className="drawer-option" onClick={option.onClick}>
                <span className="drawer-option-icon">
                  {option.url && (
                    <img
                      className="drawer-icon-image"
                      src={option.url}
                      alt=""
                    />
                  )}
                </span>
                <span className="drawer-option-text">{option.text}</span>
              </div>
            );
          })}
        </div>
      }
    </>
  );
};
