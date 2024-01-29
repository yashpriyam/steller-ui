import * as React from "react";
export const PaymentIcon: React.FC<SvgIconProps> = ({
    height = "25px",
    width = "25px",
    isDarkMode,
    fillColor = ""
  }: SvgIconProps) => (
  <svg
    fill="#000"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    id="payment-error"
    data-name="Flat Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-color"
  >
    <rect
      id="primary"
      x={2}
      y={4}
      width={20}
      height={16}
      rx={2}
      style={{
        fill: "rgb(256, 256, 256)",
      }}
    />
    <path
      id="secondary"
      d="M19,15.5a1.49,1.49,0,0,1-2.5,1.11,1.5,1.5,0,1,1,0-2.22A1.49,1.49,0,0,1,19,15.5ZM7,14a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,7,14Zm1-3V8A1,1,0,0,0,6,8v3a1,1,0,0,0,2,0Z"
      style={{
        fill: "rgb(44, 169, 188)",
      }}
    />
  </svg>
);

