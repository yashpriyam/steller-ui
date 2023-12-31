import * as React from "react";
const LeftArrow: React.FC<React.SVGProps<SVGSVGElement>>  = (props) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="20px"
    height="20px"
    viewBox="0 0 64 64"
    enableBackground="new 0 0 64 64"
    xmlSpace="preserve"
    {...props}
  >
    <g>
      <polyline
        fill="none"
        stroke="#ffffff"
        strokeWidth={2}
        strokeLinejoin="bevel"
        strokeMiterlimit={10}
        points="37,15 20,32  37,49  "
      />
    </g>
  </svg>
);
export default LeftArrow;
