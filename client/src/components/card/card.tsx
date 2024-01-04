import React from "react";
import "./card.scss";
interface CardProps {
  style?: object;
  width?: string;
  height?: string;
  className?: string;
  onClick?: () => {};
  disabled?: boolean;
  data?: VideoDataType;
  children?: React.ReactNode | string;
  tagPosition?: "left" | "center" | "right";
}

export const Card: React.FC<CardProps> = ({
  data,
  width,
  height,
  children,
  className,
  style = {},
  tagPosition = "left",
}: CardProps) => {
  const {
    dayNumber,
    description,
    duration,
    isActive,
    links,
    title,
    videoNumber,
    topics,
  } = data || {};
  return (
    <div
      className={`main-container ${className}`}
      style={{ ...style, height: height, width: width }}
      onClick={() => {
        // useNavigate
      }}
    >
      <div className="image-div">
        <iframe
          width="560"
          height="315"
          className="img"
          src={links?.youtube}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onClick={()=>{}}
        >
        </iframe>
        <span className="unclickable"></span>
        <span className={`tags-span  ${tagPosition}`}>
          {topics?.map((tag, i) => {
            return i <= 1 ? (
              <span className={`tags ${tag}`}>{tag}</span>
            ) : (
              <span className={`tags hidden-tags ${tag}`}>{tag}</span>
            );
          })}
        </span>
      </div>
      <div className="text">
        {description && <p>{description}</p>}
        {title && (
          <p className="card-title">
            <strong>{title}</strong>
          </p>
        )}
        <div className="videodata-wrapper">
          {dayNumber && <span>Day Number : {dayNumber}</span>}
          {duration && <span>duration : {duration}</span>}
          {videoNumber && <span>Video Number : {videoNumber}</span>}
        </div>
        {children && children}
      </div>
    </div>
  );
};
