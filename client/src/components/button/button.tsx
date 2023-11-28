import React from "react";
import "../../styles/components/button.scss";
import loader from "../../icons/index";
interface ModalProps {
  className: string;
  isDisabled: boolean;
  onClick: () => void; // Adjusted the type of onClick and onHover to void
  onHover: () => void;
  size: "small" | "medium" | "large"; // Restrict size to specific values
  variant?: "text" | "contained" | "outlined";
  isHidden: boolean;
  iconOnLeft?: string;
  iconOnRight?: string;
  iconOnCentre?: string;
  isLoading?: boolean;
  loaderPosition?: "left" | "center" | "right";
  loaderIcon?: string;
}

export const Button: React.FC<ModalProps> = ({
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
  loaderIcon = loader,
}) => {
  return (
    <>
      {!isHidden && (
        <button
          className={`${className} ${variant} ${size}`}
          disabled={isDisabled}
          onClick={onClick}
          onMouseEnter={onHover}
        >
          {(isLoading && (
            <span className={loaderPosition}>
              <span className="leftSubmit">Submit</span>
              <img src={loaderIcon} alt="loading..." />
              <span className="rightSubmit">Submit</span>
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
            ))}
        </button>
      )}
    </>
  );
};
