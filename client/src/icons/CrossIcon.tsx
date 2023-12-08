import { ReactElement } from "react";

interface IconProps {
  width?: number;
  height?: number;
}

function CrossIcon({ width = 24, height = 24 }: IconProps): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fillRule="evenodd"
      clipRule="evenodd"
      imageRendering="optimizeQuality"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <path
        fill="#606060"
        d="M4.5 3.5c2.575 1.228 4.908 2.895 7 5a31.856 31.856 0 005-4.5c2.167-.5 3 .333 2.5 2.5a31.859 31.859 0 00-4.5 5 31.857 31.857 0 004.5 5c.5 2.167-.333 3-2.5 2.5a31.857 31.857 0 00-5-4.5 31.859 31.859 0 00-5 4.5c-2.167.5-3-.333-2.5-2.5a31.856 31.856 0 004.5-5 31.858 31.858 0 00-4.5-5c-.47-1.077-.303-2.077.5-3z"
        opacity="0.663"
      ></path>
    </svg>
  );
}
export default CrossIcon;