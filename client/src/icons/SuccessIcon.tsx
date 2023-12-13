import {ReactElement} from "react";
interface IconProps {
    width?: number;
    height?: number;
  }
const SuccessIcon=({ width = 24, height = 24 }: IconProps): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 48 48"
    >
      <path
        fill="#c8e6c9"
        d="M44 24c0 11.045-8.955 20-20 20S4 35.045 4 24 12.955 4 24 4s20 8.955 20 20z"
      ></path>
      <path
        fill="#4caf50"
        d="M34.586 14.586l-13.57 13.586-5.602-5.586-2.828 2.828 8.434 8.414 16.395-16.414-2.829-2.828z"
      ></path>
    </svg>
  );
};

export default SuccessIcon;
