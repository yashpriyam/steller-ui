import React from "react";
import "./overviewComponent.scss";

export const OverviewComponent: React.FC<OverviewComponentProps> = ({
  overviewTitle,
  overviewMainContent,
  overviewSubcontent,
  courseDetailsTitle,
  courseDetails = [],
  overviewButtonOne,
  overviewButtonTwo,
}: OverviewComponentProps) => {
  const courseDetailsToMap = courseDetails.map((items, index) => {
    return <p className="course-detail-lines">{items}</p>;
  });
  return (
    <div className="overview-container">
      <span className="overview-title">{overviewTitle}</span>
      <div className="overview-box">
        <div className="overview-text">
          <p className="overview-content-large">{overviewMainContent}</p>
          <p className="overview-content-small">{overviewSubcontent}</p>
        </div>
      </div>
      <div className="course-overview-buttons">
        <button className="course-overview-button-one">
          {overviewButtonOne}
        </button>
        <button className="course-overview-button-two">
          {overviewButtonTwo}
        </button>
      </div>
      <div className="course-details">
        <p className="course-details-title">{courseDetailsTitle}</p>
        {courseDetailsToMap}
      </div>
    </div>
  );
};
