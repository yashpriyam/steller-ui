import React, { useEffect, useState } from "react";
import "./dayPage.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useVideos } from "../../redux/actions/videosAction";
import { useNotes } from "../../redux/actions/notesAction";
import DropDownIcon from "../../icons/dropDownIcon";
import { useQuestions } from "../../redux/actions/questionAction";
import QuestionAccordion from "../../components/questionAccordion/questionAccordion";
import { useTranslation } from "react-i18next";
import { useQuestionAttempt } from "../../redux/actions/questionAttemptAction";

const DayPage: React.FC<DayPagePropsInterface> = ({
  className,
  title,
}: DayPagePropsInterface) => {
  const [activeScrollbar, setActiveScrollbar] = useState<boolean>(false);
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const { dayNumber } = useParams();
  const contentDayNumber: number = Number(dayNumber);
  const { videoData, getAllVideos } = useVideos();
  const { noteData, getAllNotes } = useNotes();
  const { questions, getAllQuestions } = useQuestions();
  const { videoList } = videoData;
  const { noteList } = noteData;
  const { questionList } = questions;
  const { questionAttempt, createQuestionAttemptByUser } = useQuestionAttempt();
  const { isLoading } = questionAttempt;
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navigationLinksData: string[] = ["videos", "questions", "notes"];
  const handleToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  };
  const onSubmit = async (
    question: QuestionDataType,
    selectedValues: QuestionSelectedValueType[]
  ) => {
    const filteredData = selectedValues.map((selectedValue) => ({
      imageUrl: selectedValue.imageUrl,
      text: selectedValue.text,
    }));
    try {
      await createQuestionAttemptByUser(filteredData, question.id);
    } catch (err) {
      console.log(err);
    }
  };
  const handleNavigation = (dayContent: string) => {
    if (dayContent === "questions") {
      navigate(`/question?day=${contentDayNumber}`);
    } else {
      navigate(`${pathname}/${dayContent}`);
    }
  };

  const getAllDataRequest = async (dayNumber: number) => {
    await getAllVideos({ dayNumber });
    await getAllNotes({ dayNumber });
    await getAllQuestions(); // currently there are no filters in getAllQuestions api @dhananjayadav
  };
  useEffect(() => {
    getAllDataRequest(contentDayNumber);
  }, [dayNumber]);
  return (
    <div className={`main-daypage-container ${className}`}>
      <div className="main-title-div">{`Day ${contentDayNumber}`}</div>
      <div className="content-navigation">
        {navigationLinksData.map((nav) => (
          <span
            className="navigator"
            onClick={() => {
              handleNavigation(nav);
            }}
          >
            {t(nav)}
          </span>
        ))}
      </div>
      <div className="content-wrapper">
        <div
          className={`videos-notes-wrapper ${
            toggleSidebar && "expanded-videos-wrapper"
          }`}
        >
          <div className="videos-wrapper">
            <div
              className="content-header"
              onClick={() => {
                handleNavigation("videos");
              }}
            >
              {t("videos")}
            </div>
            <div
              className={`videos-content-wrapper ${
                activeScrollbar && "show-scrollbar"
              }`}
              onScroll={() => setActiveScrollbar(true)}
            >
              {videoList?.map((video, index) => {
                const {
                  dayNumber,
                  description,
                  duration,
                  isActive,
                  links,
                  title,
                  topics,
                  videoNumber,
                } = video;
                return (
                  <div key={index} className="video-content-wrapper">
                    <div className="video-content">
                      <iframe
                        src={links?.youtube}
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="video-iframe"
                      ></iframe>
                    </div>
                    <div className="content-text-wrapper">
                      {title && <div className="content-title">{title}</div>}
                      {description && (
                        <div className="">{description}</div>
                      )}
                      {duration && (
                        <div className="">{`Duration : ${duration}`}</div>
                      )}
                      {videoNumber && (
                        <div className="">{`Video Number : ${videoNumber}`}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={"notes-wrapper"}>
            <div
              className="content-header"
              onClick={() => {
                handleNavigation("notes");
              }}
            >
              {t("notes")}
            </div>
            <div className="note-content-wrapper">
              {noteList?.map((note, index) => {
                const {
                  dayNumber,
                  description,
                  estimatedReadingTime,
                  link,
                  noOfPages,
                  title,
                  topics,
                } = note;
                return (
                  <div key={index} className="note-content-container">
                    <div key={index} className="note-content">
                      <iframe
                        src={link}
                        title={title}
                        scrolling="no"
                        frameBorder="0"
                        // webkitAllowFullScreen
                        // mozallowfullscreen
                        allowFullScreen
                        className="note-iframe"
                        key={index}
                      ></iframe>
                    </div>
                    <div className="content-text-wrapper">
                      {title && <div className="content-title">{title}</div>}
                      {description && (
                        <div className="">{description}</div>
                      )}
                      {estimatedReadingTime && (
                        <div className="">{`Estimated Reading Time : ${estimatedReadingTime}`}</div>
                      )}
                      {noOfPages && (
                        <div className="">{`Total Numbers of Pages : ${noOfPages}`}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="content-separator">
          <div className="line">
            <span
              className={`icon ${toggleSidebar && "rotate-icon"}`}
              onClick={handleToggleSidebar}
            >
              <DropDownIcon color="black" />
            </span>
          </div>
        </div>
        <div
          className={`question-wrapper ${toggleSidebar && "hide-question-bar"}`}
        >
          <div
            className="content-header"
            onClick={() => {
              navigate(`/question?day=${dayNumber}`);
            }}
          >
            {t("questions")}
          </div>
          <div
            className={`questions-content-wrapper ${
              activeScrollbar && "show-scrollbar"
            }`}
            onScroll={() => setActiveScrollbar(true)}
          >
            {questionList?.map((questionData, index) => {
              return (
                <div className="question-content-wrapper">
                  <div
                    className={`question-content ${
                      toggleSidebar && "resize-ques-card-height"
                    }`}
                  >
                    <QuestionAccordion
                      key={index}
                      questionData={questionData}
                      onSubmit={onSubmit}
                      isLoading={isLoading}
                      errorMsg={t("incorrect_answer")}
                      successMsg={t("correct_answer")}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayPage;