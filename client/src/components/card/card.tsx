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
    links,
    title,
    videoNumber,
    topics,
    thumbnailImage
  } = data || {};
  return (
    <a target="blank" href={links?.youtube} style={{textDecoration: 'none'}}>
      <div
        className={`card-main-container ${className}`}
        style={{ ...style, height: height, width: width }}
      >
        <div className="card-image-container">
            <img className="card-image" src={thumbnailImage} alt="video_thumbnail" />
          <span className={`card-tags-wrapper ${tagPosition}`}>
            {topics?.map((tag, i) => {
              return i <= 1 ? (
                <span className={`card-tag ${tag}`}>{tag}</span>
                ) : (
                  <span className={`card-tag hidden-tags ${tag}`}>{tag}</span>
                  );
                })}
          </span>
        </div>
        <div className="card-text-wrapper">
          {title && (
            <p className="card-title">
              <strong>{title}</strong>
            </p>
          )}
          {description && <p className="video-description-data">{description}</p>}
          <div className="videodata-wrapper">
            {duration && <span>Duration : {duration}</span>}
            {dayNumber && <span>Day Number : {dayNumber}</span>}
            {children}
          </div>
        </div>
      </div>
    </a>
  );
};
