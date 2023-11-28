import React, { useEffect, useRef } from "react";
import "../../styles/components/button.scss";

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
  loaderPosition?: "left" | "centre" | "right";
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
  loaderPosition = "centre",
  loaderIcon,
}) => {
  const fontTextSize: Record<string, string> = {
    small: "14px",
    medium: "16px",
    large: "18px",
  };
  //   useEffect(() => {
  //     if (ref.current) {
  //           if (isLoading) {
  //             ref.current.innerHTML = `<img src=${loaderIcon} alt="loading..."/>`;
  //             ref.current.style.display = "flex";
  //             ref.current.style.justifyContent = loaderPosition;
  //           } else if (iconOnLeft) {
  //             ref.current.innerHTML = `<img src=${iconOnLeft} alt="loading..."/> <span>Submit</span>`;
  //           } else if (iconOnRight) {
  //             ref.current.innerHTML = `<span>Submit</span> <img src=${iconOnRight} alt="loading..."/>`;
  //           } else if (iconOnCentre) {
  //             ref.current.innerHTML = `<img src=${iconOnCentre} alt="loading..."/>`;
  //           } else {
  //             ref.current.innerText = "Submit";
  //           }
  //     }
  //   });

  const ref = useRef<HTMLButtonElement>(null);

  return (
    <>
      {isHidden === false && (
        <button
          ref={ref}
          className={`${className} ${variant} ${size}`}
          disabled={isDisabled}
          onClick={onClick}
          onMouseEnter={onHover}
        >
          {(iconOnCentre && <img src={iconOnCentre} alt="loading..." />) ||
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
