import React from "react";
import "../../styles/components/button.scss";
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
         
  return (
    <>
      {!isHidden && (
        <button
          className={`button-component ${className} ${variant==="text"?"text-button-style":variant==="outlined"?"outlined-button-style":"conatined-button-style"} ${size==="small"?"small-fontsize":size==="medium"?"medium-fontsize":"large-fontsize"}`}
          disabled={isDisabled}
          onClick={onClick}
          onMouseEnter={onHover}
        >
          {(isLoading && (
            <span className={`loader-postion-style ${loaderPosition==='left'?"loader-position-left":loaderPosition==='right'?"loader-position-right":"loader-position-center"}`}>
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
