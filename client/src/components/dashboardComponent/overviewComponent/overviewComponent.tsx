import React from "react";
import "./overviewComponent.scss";


interface overviewComponentProps {
    overview_title?: string;
    overview_main_content?: string;
    overview_subcontent?: string;
    course_details_title?: string;
    course_details?: string[];
    overview_button_one?:string;
    overview_button_two?:string;
}

export const OverviewComponent: React.FC<overviewComponentProps> = ({
    overview_title,
    overview_main_content,
    overview_subcontent,
    course_details_title,
    course_details=[],
    overview_button_one,
    overview_button_two,


}: overviewComponentProps) => {

    const courseDetails = course_details.map((items, index) => {
        return <p className="course-detail-lines">{items}</p>;
      })
    return(
        <div className="overview-container">
        <span className="overview-title">{overview_title}</span>
        <div className="overview-box">
          <div className="overview-text">
            <p className="overview-content-large">{overview_main_content}</p>
            <p className="overview-content-small">{overview_subcontent}</p>
          </div>
        </div>
        <div className="course-overview-buttons">
          <button className="course-overview-button-one">
            {overview_button_one}
          </button>
          <button className="course-overview-button-two">{overview_button_two}</button>
        </div>
        <div className="course-details">
          <p className="course-details-title">{course_details_title}</p>
          {courseDetails}
        </div>
      </div>
    )
};
