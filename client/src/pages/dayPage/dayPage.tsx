import React, { useEffect, useState } from "react";
import "./dayPage.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useVideos } from "../../redux/actions/videosAction";
import { useNotes } from "../../redux/actions/notesAction";
import DropDownIcon from "../../icons/dropDownIcon";
import { useQuestions } from "../../redux/actions/questionAction";
import QuestionAccordion from "../../components/questionAccordion/questionAccordion";
import { useTranslation } from "react-i18next";
import { useQuestionAttempt } from "../../redux/actions/questionAttemptAction";
import Spinner from "../../components/spinner/spinner";

const DayPage: React.FC<DayPagePropsInterface> = ({
  className,
  title,
}: DayPagePropsInterface) => {
  const [activeScrollbar, setActiveScrollbar] = useState<boolean>(false);
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const [ searchParams ] = useSearchParams();
  const dayNumber = Number(searchParams.get('dayNumber'))
  const weekNumber = Number(searchParams.get('weekNumber'))
  const { videoData, getAllVideos } = useVideos();
  const { noteData, getAllNotes } = useNotes();
  const { questions, getAllQuestions } = useQuestions();
  const { questions:questionList, isQuestionLoading } = questions||[];
  const { videoList, isVideosLoading } = videoData;
  const { noteList, isNotesLoading } = noteData;
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
      const response = await createQuestionAttemptByUser(filteredData, question._id);      
    } catch (err) {
      console.log(err);
    }
  };
  const handleNavigation = (dayContent: string) => {
    if (dayContent === "questions") {
      navigate(`/question?day=${dayNumber}`);
    } else {
      navigate(`${pathname}/${dayContent}`);
    }
  };

  const getAllDataRequest = async (dayNumber: number, weekNumber: number) => {
    await getAllVideos({ dayNumber, weekNumber });
    await getAllNotes({ dayNumber, weekNumber });
    await getAllQuestions({day: dayNumber, week: weekNumber}); 
  };
  useEffect(() => {
    getAllDataRequest(dayNumber, weekNumber);
  }, [dayNumber]);
  return (
    <div className={`main-daypage-container ${className}`}>
      <div className="main-title-div">{`Day ${dayNumber}`}</div>
      <div className="content-navigation">
        {navigationLinksData.map((nav) => (
          <span
            className="navigator"
            onClick={() => {
              // handleNavigation(nav); disabled navigation TO-DO @sujal
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
                // handleNavigation("videos"); disabled navigation TO-DO @sujal
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
              {isVideosLoading ? <Spinner/> : videoList?.length ? videoList.map((video, index) => {
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
              }) : <div>{t("no_video_found")}</div>}
            </div>
          </div>

          <div className={"notes-wrapper"}>
            <div
              className="content-header"
              onClick={() => {
                // handleNavigation("notes"); disabled navigation TO-DO @sujal
              }}
            >
              {t("notes")}
            </div>
            <div className="note-content-wrapper">
              {isNotesLoading ? <Spinner/> : noteList?.length ? noteList.map((note, index) => {
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
              }) : <div>{t("no_note_found")}</div> }
            </div>
          </div>
        </div>
        <div className="content-separator">
          <div className="line">
            <span
              className={`icon ${toggleSidebar && "rotate-icon"}`}
              onClick={handleToggleSidebar}
            >
              <DropDownIcon isDarkMode={true} />
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
            { isQuestionLoading ? <Spinner/> : questionList?.length ?
              questionList?.map((questionData,index) => {
                return (
                  <div className="question-content-wrapper">
                    <div
                      className={`question-content ${
                        toggleSidebar && "resize-ques-card-height"
                      }`}
                    >
                      <QuestionAccordion
                        key={index}
                        questionNumber={index + 1}
                        questionData={questionData}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                        isCorrect={questionData.isCorrect}
                        isAnswered={questionData.isAnswered}
                        errorMsg={t("incorrect_answer")}
                        successMsg={t("correct_answer")}
                      />
                    </div>
                  </div>
                );
              })
              : <div>{t("no_question_found")}</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayPage;