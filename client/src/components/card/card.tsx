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
  } = data || {};
  return (
    <div
      className={`main-container ${className}`}
      style={{ ...style, height: height, width: width }}
    >
      <div className="card-image-container">
        <iframe
          width="560"
          height="315"
          className="card-image"
          src={links?.youtube}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <div className="overlay-div"></div>
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
        {description && <p>{description}</p>}
        <div className="videodata-wrapper">
          {dayNumber && <span>Day Number : {dayNumber}</span>}
          {duration && <span>duration : {duration}</span>}
          {videoNumber && <span>Video Number : {videoNumber}</span>}
          {children}
        </div>
      </div>
    </div>
  );
};
