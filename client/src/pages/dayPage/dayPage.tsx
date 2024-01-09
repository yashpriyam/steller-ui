import React, { useEffect, useState } from "react";
import "./dayPage.scss";
import Accordion from "../../components/accordion/accordion";
import { useNavigate, useParams } from "react-router-dom";
import { useVideos } from "../../redux/actions/videosAction";
import { useNotes } from "../../redux/actions/notesAction";
import DropDownIcon from "../../icons/dropDownIcon";
import { useQuestions } from "../../redux/actions/questionsAction";
interface DayPageProps {
  className?: string;
  title?: React.ReactNode | string;
}

export const DayPage: React.FC<DayPageProps> = ({
  className,
  title,
}: DayPageProps) => {
  const [activeScrollbar, setActiveScrollbar] = useState<boolean>(false);
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const handleToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  };
  const navigate = useNavigate();
  const { dayNumber } = useParams();
  const { videoData, getAllVideos } = useVideos();
  const { noteData, getAllNotes } = useNotes();
  const { questionData, getAllQuestions } = useQuestions();
  const { videoList } = videoData;
  const { noteList } = noteData;
  const { questionList } = questionData;

  const handleNavigation = (context: string) => {
    navigate(`/dayContext/${context}`);
  };
  const getAllDataRequest = async (dayNumber: number) => {
    await getAllVideos({ dayNumber });
    await getAllNotes({ dayNumber });
    await getAllQuestions({});
  };
  useEffect(() => {
    getAllDataRequest(Number(dayNumber));
    // eslint-disable-next-line
  }, []);
  return (
    <div className={`main-daypage-container ${className}`}>
      <div className="main-title-div">{`Day ${dayNumber}`}</div>
      <div className="content-navigation">
        <span
          className="naviagtor"
          onClick={() => {
            handleNavigation("videos");
          }}
        >
          Videos
        </span>
        <span
          className="naviagtor"
          onClick={() => {
            handleNavigation("question");
          }}
        >
          Questions
        </span>
        <span
          className="naviagtor"
          onClick={() => {
            handleNavigation("notes");
          }}
        >
          Notes
        </span>
      </div>
      <div className="content-wrapper">
        <div className="videos-question-wrapper">
          <div
            className={`videos-wrapper ${
              toggleSidebar && "expanded-videos-wrapper"
            }`}
          >
            <div
              className="content-header"
              onClick={() => {
                handleNavigation("videos");
              }}
            >
              Videos
            </div>
            <div
              className={`videos-content-wrapper ${
                activeScrollbar && "show-scrollbar"
              }`}
              onScroll={() => setActiveScrollbar(true)}
            >
              {videoList?.map((video) => {
                return (
                  <div className="video-content-wrapper">
                    <div className="video-content">
                      <iframe
                        src={video?.links?.youtube}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="video-iframe"
                      ></iframe>
                    </div>
                    <div className="content-text-wrapper">
                      <div className="content-title">{video.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="content-separator">
            <div className="line">
              <span
                className={`icon ${toggleSidebar && "rotate-icon"}`}
                onClick={handleToggleSidebar}
              >
                <DropDownIcon color="black"/>
              </span>
            </div>
          </div>
          <div
            className={`question-wrapper ${
              toggleSidebar && "hide-question-bar"
            }`}
          >
            <div
              className="content-header"
              onClick={() => {
                handleNavigation("question");
              }}
            >
              Questions
            </div>
            <div
              className={`questions-content-wrapper ${
                activeScrollbar && "show-scrollbar"
              }`}
              onScroll={() => setActiveScrollbar(true)}
            >
              {questionList?.map((ques) => {
                return (
                  <div className="question-content-wrapper">
                    <div
                      className={`question-content ${
                        toggleSidebar && "resize-ques-card-height"
                      }`}
                    >
                      <Accordion title={"ques.question"}>
                        <div>
                          {ques.options?.map((option) => (
                            <div>
                              <input id={option.text} type="checkbox" />
                              <label htmlFor={option.text}>{option.text}</label>
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
        </div>
        <div className={"notes-wrapper"}>
          <div
            className="content-header"
            onClick={() => {
              handleNavigation("notes");
            }}
          >
            Notes
          </div>
          <div className="note-content-wrapper">
            {noteList?.map((note) => (
              <div className="note-content-container">
                <div className="note-content">
                  <iframe
                    src={note.link}
                    title={note.title}
                    scrolling="no"
                    frameBorder="0"
                    // webkitAllowFullScreen
                    // mozallowfullscreen
                    allowFullScreen
                    className="note-iframe"
                  ></iframe>
                </div>
                <div className="content-text-wrapper">
                  <div className="content-title">{note.title}</div>
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