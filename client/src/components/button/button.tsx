import React from "react";
import './button.scss';
import { Loader } from "../loader/loader";
interface ButtonProps {
  className?: string;
  isDisabled?: boolean;
  onClick ?: () => void; 
  onHover?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "text" | "contained" | "outlined";
  isHidden: boolean;
  iconOnLeft?: string;
  iconOnRight?: string;
  iconOnCentre?: string;
  isLoading?: boolean;
  loaderPosition?: "left" | "center" | "right";
  loaderIcon?: string;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  isDisabled = false,
  onClick,
  onHover,
  size = "medium",
  variant = "contained",
  isHidden = false,
  iconOnLeft,
  iconOnRight,
  iconOnCentre,
  isLoading = false,
  loaderPosition = "center",
  loaderIcon,
}: ButtonProps) => {
  const variantClassName: Record<string,string> = {
    'text': 'text-button-style',
    'outlined': 'outlined-button-style',
    'contained': 'contained-button-style'
  }
  const sizeClassName: Record<string, string> = {
    small: "small-fontsize",
    medium: "medium-fontsize",
    large: "large-fontsize",
  };
  const loaderPositionClassName: Record<string, string> = {
    left: "loader-position-left",
    center: "loader-position-center",
    right: "loader-position-right",
  };
         
  return (
    <>
      {!isHidden && (
        <button
          className={`button-component ${className} ${variantClassName[variant]} ${sizeClassName[size]}`}
          disabled={isDisabled}
          onClick={onClick}
          onMouseEnter={onHover}
        >
          {(isLoading && (
            <span className={`loader-postion-style ${loaderPositionClassName[loaderPosition]}`}>
              <span className="left-submit button-text">Submit</span>
                {loaderIcon?<img className="loader-icon" src={loaderIcon} alt="loading..." />:
              <Loader/>}
              <span className="right-submit button-text">Submit</span>
            </span>
          )) ||
            (iconOnCentre && <img src={iconOnCentre} alt="loading..." />) ||
            (iconOnLeft && (
              <span>
                <img src={iconOnLeft} alt="loading..." /> Submit
              </span>
            )) ||
            (iconOnRight && (
              <span>
                Submit
                <img src={iconOnLeft} alt="loading..." />
              </span>
            ))|| <span>Submit</span>}
        </button>
      )}
    </>
  );
};
