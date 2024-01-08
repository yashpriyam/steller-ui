import React from "react";
import "./courseImageComponent.scss";

export type CourseImage = {
    image: string;
    course_title: string;
    course_subtitle: string;
  };

interface courseImageProps {
    course_image_element?: CourseImage[];
}

export const CourseImageComponent: React.FC<courseImageProps> = ({
    course_image_element=[],

}: courseImageProps) => {
    const couserImageElements = course_image_element.map((object, index) => {
        return (
          <div className="image-container">
            <img className="courses-image" src={object.image} />
            <div className="course-title-container">
              <div className="course-image-title">
                {object.course_title}
              </div>
              <div className="course-image-subtitle">
                {object.course_subtitle}
              </div>
            </div>
          </div>
        );
      })
    return(
        <div className="course-image-box">
          {couserImageElements}
        </div>
       
    );
};
