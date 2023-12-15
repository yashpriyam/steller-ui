import * as React from "react";
const SVGCalenderComponent = (props: any) => (
  <svg
    fill="#000000"
    width="18px"
    height="18px"
    viewBox="0 0 24 24"
    id="calendar"
    data-name="Line Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon line-color"
    {...props}
  >
    <rect
      id="primary"
      x={3}
      y={4}
      width={18}
      height={17}
      rx={1}
      style={{
        fill: "none",
        stroke: "rgb(0, 0, 0)",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <path
      id="secondary"
      d="M20,4H4A1,1,0,0,0,3,5V9H21V5A1,1,0,0,0,20,4ZM17,3V5M12,3V5M7,3V5"
      style={{
        fill: "none",
        stroke: "rgb(44, 169, 188)",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </svg>
);
export default SVGCalenderComponent;
