import * as React from "react";
export const HomeIcon: React.FC<SvgIconProps> = ({
  height = "25px",
  width = "25px",
  isDarkMode,
  fillColor = ""
}: SvgIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 15 15"
    xmlns="http://www.w3.org/2000/svg"
    id="home"
    fill={fillColor ? fillColor : (isDarkMode ? "#fff" : "#000")}
  >
    <path
      d="M2,13.7478c0,0.13807,0.11193,0.25,0.25,0.25h3.749v-3h3v3h3.749c0.13807,0,0.25-0.11193,0.25-0.25V7.9987H2&#xA;&#x9;C2,7.9987,2,13.7478,2,13.7478z M13.93,6.5778l-0.9319-0.8189V2c0-0.55228-0.44771-1-1-1s-1,0.44772-1,1v2L7.6808,1.09&#xA;&#x9;C7.5863,0.9897,7.42846,0.98478,7.3279,1.079L7.3169,1.09L1.0678,6.553C0.9734,6.65376,0.97856,6.81197,1.07932,6.90637&#xA;&#x9;C1.12478,6.94896,1.18451,6.97304,1.2468,6.9739L3,6.9989h10.7468c0.13807,0.00046,0.25037-0.1111,0.25083-0.24917&#xA;&#x9;C13.99784,6.68592,13.97365,6.62445,13.93,6.5779V6.5778z"
    />
  </svg>
);