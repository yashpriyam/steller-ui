// icon:goal | Lucide https://lucide.dev/ | Lucide
import * as React from "react";

export const GoalsIcon : React.FC<SvgIconProps> = ({
    width="25",
    height="25",
    className="",
    fillColor,
    isDarkMode,
}) => {
  return (
    <svg
      fill={fillColor ? fillColor : "none"}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height={height}
      width={width}
    >
      <path d="M12 13V2l8 4-8 4M20.55 10.23A9 9 0 118 4.94M8 10a5 5 0 108.9 2.02" />
    </svg>
  );
}