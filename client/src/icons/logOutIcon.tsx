import * as React from "react";
export const LogOutIcon: React.FC<SvgIconProps> = ({
  height = "25px",
  width = "25px",
  isDarkMode,
  fillColor = ""
}: SvgIconProps) => (
  <svg
    id="Uploaded to svgrepo.com"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={width}
    height={height}
    fill={fillColor ? fillColor : (isDarkMode ? "#fff" : "#000")}
    viewBox="0 0 32 32"
    xmlSpace="preserve"
  >
    <path d="M30,17c0,7.72-6.28,14-14,14S2,24.72,2,17C2,10.311,6.718,4.71,13,3.332v4.129 C8.948,8.739,6,12.531,6,17c0,5.514,4.486,10,10,10s10-4.486,10-10c0-4.469-2.948-8.261-7-9.539V3.332C25.282,4.71,30,10.311,30,17z  M16,13c1.104,0,2-0.896,2-2V3c0-1.104-0.896-2-2-2s-2,0.896-2,2v8C14,12.104,14.896,13,16,13z" />
  </svg>
);