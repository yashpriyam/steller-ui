  import React from "react";
import "./button.scss";
import { Loader } from "../loader/loader";
interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onHover?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: "small" | "medium" | "large";
  variant?: "text" | "contained" | "outlined";
  iconPosition?: "left" | "center" | "right";
  className?: string;
  isDisabled?: boolean;
  isHidden?: boolean;
  icon?: string;
  isLoading?: boolean;
  loaderIcon?: string;
  text?: string;
  style?: object;
}

export const Button: React.FC<ButtonProps> = ({
  onClick = (e: React.MouseEvent<HTMLButtonElement>) => {},
  onHover = (e: React.MouseEvent<HTMLButtonElement>) => {},
  size = "small",
  variant = "outlined",
  iconPosition = "left",
  text = "submit",
  className,
  isDisabled,
  isHidden,
  icon,
  isLoading,
  loaderIcon,
  style = {},
}: ButtonProps) => {
  const variantMap: Record<string, string> = {
    text: "text-button-style",
    outlined: "outlined-button-style",
    contained: "contained-button-style",
  };
  const sizeMap: Record<string, string> = {
    small: "small-fontsize",
    medium: "medium-fontsize",
    large: "large-fontsize",
  };
  const iconPositionMap: Record<string, string> = {
    left: "icon-position-left",
    center: "icon-position-center",
    right: "icon-position-right",
  };
  return (
    <>
      {!isHidden && (
        <button
          className={`button-component ${className} ${variantMap[variant]} ${sizeMap[size]}`}
          disabled={isDisabled}
          onClick={onClick}
          onMouseEnter={onHover}
          style={style}
        >
          {isLoading || icon ? (
            <span
              className={`loader-postion-style ${iconPositionMap[iconPosition]}`}
            >
              <span className="loader-left-button loader-button">{text}</span>
              {(isLoading ? loaderIcon : icon) ? (
                <img
                  className="loader-icon"
                  src={isLoading ? loaderIcon : icon}
                  alt=""
                />
              ) : (
                <Loader />
              )}
              <span className="loader-right-button loader-button">{text}</span>
            </span>
          ) : (
            <span>{text}</span>
          )}
        </button>
      )}
    </>
  );
};
