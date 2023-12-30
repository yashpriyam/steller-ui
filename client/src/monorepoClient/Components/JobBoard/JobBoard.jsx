import React, { useContext } from "react";
import { jobDataList } from "../../jobDataList";
import "./JobBoard.scss";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Themecontext/ThemeContext";
import TextComponent from "../TextComponent/TextComponent";

const JobBoard = () => {
  const { darkMode } = useContext(ThemeContext);
  const start = 0;
  const second = Math.floor(jobDataList.length / 3);
  const third = second + second;
  const animationDuration = `${jobDataList.length * 3}s`;
  const isMobileView = window.innerWidth < 464;

  return (
    <div
      id="jobs"
      className={
        darkMode
          ? "main-container job-container-black"
          : "main-container job-container-White"
      }
    >
      <TextComponent className="planDescription">
        <h2>Jobs</h2>
        {/* <p>Lets sort your doubts.</p> */}
      </TextComponent>
      <TextComponent className="planDescription">
        <h3>Search Jobs</h3>
        {/* <p>Lets sort your doubts.</p> */}
      </TextComponent>
      {isMobileView ? (
        <div
          style={{ animationDuration }}
          className="job-container moving-text"
        >
          {jobDataList?.slice(start).map((jobData) => (
            <Card job={jobData} />
          ))}
        </div>
      ) : (
        <>
          <div
            style={{ animationDuration }}
            className="job-container moving-text"
          >
            {jobDataList?.slice(start, second).map((jobData) => (
              <Card job={jobData} />
            ))}
          </div>
          <div
            style={{ animationDuration }}
            className="job-container moving-text-right"
          >
            {jobDataList?.slice(second, third).map((jobData) => (
              <Card job={jobData} />
            ))}
          </div>
          <div
            style={{ animationDuration }}
            className="job-container moving-text"
          >
            {jobDataList?.slice(third).map((jobData) => (
              <Card job={jobData} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Card = ({ job }) => {
  const navigate = useNavigate();
  const {
    companyName,
    companyLogo,
    jobTitle,
    experienceRequired,
    techStack,
    package: jobPackage,
  } = job;
  return (
    <div onClick={() => navigate("/register")} className="card-container">
      <div className="card-header">
        <div className="company-logo">{companyLogo}</div>
        <div className="company-name">{companyName}</div>
      </div>
      <div className="job-title">{jobTitle}</div>
      <div className="experience-section">{`${experienceRequired}`}</div>
      <div className="tech-stack-section">{techStack}</div>
      <div className="package-section">{`${jobPackage}`}</div>
    </div>
  );
};

export default JobBoard;
