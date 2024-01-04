import React from "react";

interface DropDownIconProps {
  className?: string;
  color?: string;
}
const DropDownIcon: React.FC<DropDownIconProps> = ({
  className,
  color = "white",
} : DropDownIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="16"
      viewBox="0 0 320 512"
      className={className}
    >
      <path
        fill={color}
        d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301 191.9 288 191.9L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
      ></path>
    </svg>
  );
};

export default DropDownIcon;