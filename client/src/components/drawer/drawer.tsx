import "./drawer.scss";
import {  useRef } from "react";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";
import { Icon } from "../../icons/avatar";

interface DrawerProps {
  direction?: "left" | "right" | "top" | "bottom";
  onClose?: () => void;
  onSelect?:(value:string)=>void
  isOpen?: boolean;
  className?: string;
  icon?: string;
  style?: object;
  options?: {
    text: string;
    url: string;
  }[];
}

export const Drawer: React.FunctionComponent<DrawerProps> = ({
  direction = "right",
  isOpen,
  onClose,
  onSelect,
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
  const drawerRef = useRef<HTMLDivElement | null>(null);
  useOnOutsideClick(drawerRef, () => onClose && onClose());
  const onClickFunction= (value: string) => {
    onSelect && onSelect(value)
  };
  return (
    <>
      {
        <div
          ref={drawerRef}
          style={style}
          className={`drawer-container ${drawerContainerMap[direction]} ${
            !isOpen && drawerCloseMap[direction]
          } ${className}`}
        >
          <div className="drawer-icon-options-wrapper">
            {icon && <div className="drawer-icon-container">
              <img className="drawer-icon" src={icon} alt="" />
            </div>}
            {options?.map((option, index) => {
              return (
                <div
                  className="drawer-option"
                  onClick={() => {
                    onClickFunction(option.text);
                  }}
                >
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
          <div className="drawer-avatar-conatiner">
            <Icon className="drawer-avatar" />
          </div>
        </div>
      }
    </>
  );
};
