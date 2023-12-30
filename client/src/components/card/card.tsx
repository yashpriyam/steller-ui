import React from "react";
import "./card.scss";
interface CardProps {
  title?: React.ReactNode | string;
  children?: React.ReactNode | string;
  className?: string;
  style?: object;
  openBy?: "icon" | "div";
  onClick?: () => {};
  // icon?: React.ReactNode;
  tagPosition?: "left" | "center" | "right";
  openOnClick?: boolean;
  openOnHover?: boolean;
  disabled?: boolean;
  height?: string;
  width?: string;
  subtitle?: string;
  img?: string | React.ReactNode;
  tags?: string[];
}

export const Card: React.FC<CardProps> = ({
  title,
  className,
  style = {},
  tagPosition = "left",
  height,
  width,
  children,
  subtitle,
  img,
  tags,
}: CardProps) => {
  return (
    <div
      className={`main-container ${className}`}
      style={{ ...style, height: height, width: width }}
      onClick={()=>{
        // useNavigate
      }}
    >
      <div className="image-div">
        {typeof img === "string" ? (
          <img src={img} alt="img" className="img" />
        ) : (
          <span className="img">{img}</span>
        )}
        <span className={`tags-span  ${tagPosition}`}>
          {tags?.map((tag, i) => {
            return i <= 1 ? (
              <span className={`tags ${tag}`}>{tag}</span>
            ) : (
              <span className={`tags hidden-tags ${tag}`}>{tag}</span>
            );
          })}
        </span>
      </div>
      <div className="text">
        <p>{subtitle}</p>
        <p>
          <strong>{title}</strong>
        </p>
        {children && children}
      </div>
    </div>
  );
};
