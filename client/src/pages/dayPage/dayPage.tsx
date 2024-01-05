import React, { useState } from "react";
import "./dayPage.scss";
import Accordion from "../../components/accordion/accordion";
import { notesDataList, questionsDataList, videosDataList } from "./dayPageDataList";
interface DayPageProps {
  className?: string;
  title?: React.ReactNode | string;
  videosData?: { url?: string; title?: string }[];
  notesData?: { url?: string; title?: string }[];
  questionsData?: { options?: string[]; title?: string }[];
}

export const DayPage: React.FC<DayPageProps> = ({
  className,
  title = "DAY 1",
  videosData=videosDataList,
  notesData=notesDataList,
  questionsData=questionsDataList,
}: DayPageProps) => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const handleToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  };
  return (
    <div className={`main-daypage-container ${className}`}>
      <div className="main-title-div">{title}</div>
      <div className="content-navigation">
        <a href="#videos" className="naviagtor">
          Videos
        </a>
        <a href="#ques" className="naviagtor">
          Questions
        </a>
        <a href="#note" className="naviagtor">
          Notes
        </a>
      </div>
      <div className="content-wrapper">
        <div className="videos-question-wrapper">
          <div className={`videos-wrapper ${toggleSidebar && "expand-videos"}`}>
            <div id="#videos" className="content-header">
              Videos
            </div>
            {videosData?.map((video) => {
              return (
                <div className="video-content-wrapper">
                  <div className="video-content">
                    <iframe
                      src={video.url}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="iframe-video"
                    ></iframe>
                  </div>
                  <div className="content-text-wrapper">
                    <div className="content-title">{video.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="content-separator">
            <div className="line">
              <span
                className={`icon ${toggleSidebar && "rotate-icon"}`}
                onClick={handleToggleSidebar}
              >
                {">"}
              </span>
            </div>
          </div>
          <div
            className={`question-wrapper ${
              toggleSidebar && "hide-question-bar"
            }`}
          >
            <div id="#ques" className="content-header">
              Questions
            </div>
            {questionsData?.map((ques) => {
              return (
                <div className="question-content-wrapper">
                  <div
                    className={`question-content ${
                      toggleSidebar && "resize-ques-card-height"
                    }`}
                  >
                    <Accordion title={ques.title}>
                      <div>
                        {ques.options?.map((option) => (
                          <div>
                            <input id={option} type="checkbox" />
                            <label htmlFor={option}>{option}</label>
                          </div>
                        ))}
                      </div>
                    </Accordion>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={"notes-wrapper"}>
          <div id="#notes" className="content-header">
            Notes
          </div>
          <div className="note-content-wrapper">
            {notesData?.map((note) => (
              <div className="note-content-container">
                <div className="note-content">
                  <iframe
                    src={note.url}
                    title="OLX Meetup: Typesafe REST with feTS"
                    scrolling="no"
                    frameBorder="0"
                    // webkitAllowFullScreen
                    // mozallowfullscreen
                    allowFullScreen
                    className="note-iframe"
                  ></iframe>
                </div>
                <div className="content-text-wrapper">
                  <div className="content-title">Day 1 HTML</div>
                  <p>Day 2</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};