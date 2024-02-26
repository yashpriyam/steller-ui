import * as React from "react";

export const Internet: React.FC<React.SVGProps<SVGSVGElement>> = ({
    height = "25px",
    width = "25px",
}) => (
  <svg
    fill="#FFF"
    width={width}
    height={height}
    viewBox="0 0 35 35"
    data-name="Layer 2"
    id="Layer_2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.5,34.75A17.25,17.25,0,1,1,34.75,17.5,17.27,17.27,0,0,1,17.5,34.75Zm0-32A14.75,14.75,0,1,0,32.25,17.5,14.77,14.77,0,0,0,17.5,2.75Z" />
    <path d="M33.5,18.75H2.25a1.25,1.25,0,0,1,0-2.5H33.5a1.25,1.25,0,0,1,0,2.5Z" />
    <path d="M17.5,33.9c-4.86,0-8.66-7.2-8.66-16.4S12.64,1.1,17.5,1.1s8.66,7.2,8.66,16.4S22.36,33.9,17.5,33.9Zm0-30.3c-2.91,0-6.16,5.71-6.16,13.9s3.25,13.9,6.16,13.9,6.16-5.71,6.16-13.9S20.41,3.6,17.5,3.6Z" />
  </svg>
);

