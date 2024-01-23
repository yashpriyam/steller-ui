import * as React from "react";
export const VideoIcon: React.FC<SvgIconProps> = ({
  height = "25px",
  width = "25px",
  isDarkMode,
  fillColor = "",
}: SvgIconProps) => (
  <svg
    fill={fillColor ? fillColor : isDarkMode ? "#fff" : "#000"}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m11 14 7-4-7-4z" />
    <path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8z" />
    <path d="M20 2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-9 12V6l7 4-7 4z" />
  </svg>
);