import React from "react";
import "./courseImageComponent.scss";

export const CourseImageComponent: React.FC<CourseImageProps> = ({
  courseImageElement = [],
}: CourseImageProps) => {
  const couserImageElements = courseImageElement.map((items) => {
    return (
      <div className="image-container">
        <img className="courses-image" src={items.image}  alt=""/>
        <div className="course-title-container">
          <div className="course-image-title">{items.courseTitle}</div>
          <div className="course-image-subtitle">{items.courseSubtitle}</div>
        </div>
      </div>
    );
  });
  return <div className="course-image-box">{couserImageElements}</div>;
};
