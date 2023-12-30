import React, { useContext } from "react";
import "./CoursePage.scss";
import TextComponent from "../TextComponent/TextComponent";
import ImageComponent from "../ImageComponent/ImageComponent";
import RightArrowBlack from "../../assets/images/rightArrowBlack.svg";
import RightArrow from "../../assets/images/rightArrow.svg";
import RightSubscriptionCircle from "../../assets/images/rightSubscriptionCircle.svg";
import leftSubscriptionCircle from "../../assets/images/leftSubscriptionCircle.svg";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Themecontext/ThemeContext";
import { googleAnalyticsButton } from "../../helpers/utils/googleAnalyticsButton";

const CoursePage = () => {
  const { darkMode } = useContext(ThemeContext);
  const weeksTopicsList = [
    {
      weekNumber: "Week 2",
      topicName: "ADVANCED CSS LAYOUTS, ACCESSIBILITY AND SEO",
    },
    {
      weekNumber: "Week 3",
      topicName: "JAVASCRIPT BASIC SYNTAXES",
    },
    {
      weekNumber: "Week 4",
      topicName: "JAVASCRIPT ADVANCED STRUCTURES",
    },
    {
      weekNumber: "Week 5",
      topicName: "JAVASCRIPT UNDER THE HOOD",
    },
    {
      weekNumber: "Week 6",
      topicName: "BIG O' NOTATION AND DATA STRUCTURES",
    },
    {
      weekNumber: "Week 7",
      topicName: "DATA STRUCTURES AND ALGORITHMS IN JAVASCRIPT",
    },
    {
      weekNumber: "Week 8",
      topicName: "ADVANCED JAVASCRIPT ALGORITHMS",
    },
    {
      weekNumber: "Week 9",
      topicName: "'REACT' LIKE PROFESSIONALS",
    },
    {
      weekNumber: "Week 10",
      topicName: "REDUX AND NEXT",
    },
    {
      weekNumber: "Week 11",
      topicName: "NODEJS AND EXPRESS, APIS",
    },
    {
      weekNumber: "Week 12",
      topicName: "DATABASES: MONGODB AND POSTGRESQL",
    },
    {
      weekNumber: "Week 13 ... Week 16",
      topicName: "CAPSTONE PROJECTS, MOCK INTERVIEWS, RESUME, JOB APPLICATIONS",
    },
  ];
  const googleAnalyticsButtonObj = {
    CoursePageApplyButton: {
      action: "CoursePageApplyButton",
      label: "clicked on course page apply now button",
    },
  };

  return (
    <div
      id="programs"
      className={
        darkMode
          ? "faqComponent faqComponentBlack"
          : "faqComponent faqComponentWhite"
      }
    >
      <ImageComponent
        className="rightSubscriptionCircle"
        src={RightSubscriptionCircle}
        alt="rightsubscrtiptionCircle"
      />
      <ImageComponent
        className="leftSubscriptionCircle"
        src={leftSubscriptionCircle}
        alt="LeftSubscriptionCircle"
      />
      <TextComponent className="planDescription">
        <h2>Courses</h2>
        {/* <p>Lets sort your doubts.</p> */}
      </TextComponent>
      <TextComponent id="demo-week" className="planDescription">
        <h2>1. Full Stack (MERN) Development</h2>
        {/* <p>Lets sort your doubts.</p> */}
      </TextComponent>
      <div className="div">
        <div className="div-2">
          <div className="column-2">
            <div className="div-3">
              <div className="div-4">Week 1 - (Free Training)</div>
              <div className="freeweek-div-5">
                Free for all. The first week of every cohort remains a free
                entry for every one to have a sneak peek into what we offer.
                <br />
                <br />
                You need to write code every day.
              </div>
              <div className="freeweek-div-6">
                <div className="dayDescriptionRow">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e361f8e-9a7c-4630-b8fd-1438b5ff39e0?apiKey=d03ff6b018f84c75b88104249d2053b6&"
                    className="free-week-tick-img"
                    alt="1"
                  />
                  <div className="div-8">
                    <div className="div-9">Day 1 - Intro To HTML and CSS</div>
                    <div className="div-10">
                      Set up your local machine and start with basic HTML and
                      adding CSS to it.
                    </div>
                    <div className="div-17">
                      Talk - How JavaScript and React guarantee your Placement?
                    </div>
                  </div>
                </div>
                <br />
                <div className="dayDescriptionRow">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e361f8e-9a7c-4630-b8fd-1438b5ff39e0?apiKey=d03ff6b018f84c75b88104249d2053b6&"
                    className="free-week-tick-img"
                    alt="1"
                  />
                  <div className="div-8">
                    <div className="div-9">
                      Day 2 - Basics of Creating a Website
                    </div>
                    <div className="div-10">
                      Complete a basic UI setup and see your website in action
                      on your local machine.
                    </div>
                    <div className="div-17">Home Assignment - 1</div>
                  </div>
                </div>
                <br />
                <div className="dayDescriptionRow">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e361f8e-9a7c-4630-b8fd-1438b5ff39e0?apiKey=d03ff6b018f84c75b88104249d2053b6&"
                    className="free-week-tick-img"
                    alt="1"
                  />
                  <div className="div-8">
                    <div className="div-9">Day 3 - Deploying Your Website</div>
                    <div className="div-10">
                      Let's get you started with Git, Github and help you deploy
                      your own, (probably the very first) website.
                    </div>
                    <div className="div-17">
                      Talk - Writing the Resume to get you Job Interviews.
                    </div>
                  </div>
                </div>
                <br />
                <div className="dayDescriptionRow">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e361f8e-9a7c-4630-b8fd-1438b5ff39e0?apiKey=d03ff6b018f84c75b88104249d2053b6&"
                    className="free-week-tick-img"
                    alt="1"
                  />
                  <div className="div-8">
                    <div className="div-9">
                      Day 4 - Advanced HTML and CSS Animations.
                    </div>
                    <div className="div-10">
                      Let's take your website to next level by adding HTML Meta
                      tags, and CSS Animations to it.
                    </div>
                    <div className="div-17">Home Assignment - 2</div>
                  </div>
                </div>
                <br />
                <div className="dayDescriptionRow">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e361f8e-9a7c-4630-b8fd-1438b5ff39e0?apiKey=d03ff6b018f84c75b88104249d2053b6&"
                    className="free-week-tick-img"
                    alt="1"
                  />
                  <div className="div-8">
                    <div className="div-9">
                      Day 5 - Responsive CSS: Website on Mobile and Desktop
                    </div>
                    <div className="div-10">
                      Your website should look like a mobile app when users view
                      it on mobile devices.
                    </div>
                    <div className="div-17">
                      Talk - How you can get a package of 5 LPA or above?
                    </div>
                    <br />
                    <div className="div-17">
                      Final Presentation - Your Live Website and{" "}
                      <span
                        style={{
                          color: "red",
                          display: "inline-block",
                          borderBottom: "2px solid red",
                        }}
                      >
                        {" "}
                        Certificate Of Training Completion.
                      </span>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <Link
          className={`course-apply-btn ${darkMode ? "black" : "white"}`}
          to="/register"
          style={{
            textDecoration: "none",
          }}
          onClick={() => {
            googleAnalyticsButton(
              googleAnalyticsButtonObj["CoursePageApplyButton"]
            );
          }}
        >
          Apply Now To Know More
          <ImageComponent
            className="arrowIcon"
            src={darkMode ? RightArrow : RightArrowBlack}
            alt="rightArrow"
            style={{ height: "32px", width: "70px", textDecoration: "none" }}
          />
        </Link>
        <div className="paid-week">
          <div className="paid-week-div-2">
            {weeksTopicsList.map(({ weekNumber, topicName }) => (
              <div className="column">
                <div className="div-3-col">
                  <div className="div-4-icon">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce879305-6b05-4a4d-9eed-61caa5712aef?apiKey=d03ff6b018f84c75b88104249d2053b6&"
                      className="paid-week-img"
                      alt="2"
                    />
                  </div>

                  <div className="div-5">
                    <div className="div-6">{weekNumber}</div>
                    <div className="div-7">{topicName}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
