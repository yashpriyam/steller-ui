import * as React from "react";
export const PremiumMemberIcon: React.FC<SvgIconProps> = ({
    className,
    fillColor,
    height = "25px",
    isDarkMode,
    width = "25px",
}: SvgIconProps) => (

    <svg
        width={width}
        height={height}
        viewBox="0 0 120 120"
        id="Layer_1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <style type="text/css">
            {
                "\n\t.st0{fill:#647EFF;}\n\t.st1{fill:#FFFFFF;}\n\t.st2{fill:#FFD77A;}\n"
            }
        </style>
        <g>
            <polygon
                className="st0"
                points="60,13.7 70.7,19.9 83.1,19.9 89.3,30.7 100.1,36.9 100.1,49.3 106.3,60 100.1,70.7 100.1,83.1    89.3,89.3 83.1,100.1 70.7,100.1 60,106.3 49.3,100.1 36.9,100.1 30.7,89.3 19.9,83.1 19.9,70.7 13.7,60 19.9,49.3 19.9,36.9    30.7,30.7 36.9,19.9 49.3,19.9  "
            />
            <g>
                <path
                    className="st1"
                    d="M60,93.9c-18.7,0-33.9-15.2-33.9-33.9S41.3,26.1,60,26.1S93.9,41.3,93.9,60S78.7,93.9,60,93.9z M60,29    c-17.1,0-31,13.9-31,31s13.9,31,31,31s31-13.9,31-31S77.1,29,60,29z"
                />
            </g>
            <g>
                <path
                    className="st2"
                    d="M56.3,72.6L41.6,60.9c-1.2-1-1.4-2.7-0.4-3.9l0,0c1-1.2,2.7-1.4,3.9-0.4l12.6,10.1l16.8-18.8    c1-1.1,2.8-1.2,3.9-0.2v0c1.1,1,1.2,2.8,0.2,3.9L60.1,72.3C59.1,73.4,57.4,73.5,56.3,72.6z"
                />
            </g>
        </g>
    </svg>
);