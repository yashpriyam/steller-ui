import { useEffect, useState } from "react";
import { notesDataList, questionsDataList, videosDataList } from "../dayPage/dayPageDataList";
import Accordion from "../../components/accordion/accordion";
import { useNavigate, useParams } from "react-router-dom";
interface DayVideoPageProps {
  className?: string;
  title?: React.ReactNode | string;
}
const DayVideoPage: React.FC<DayVideoPageProps> = ({
  className,
  title = "DAY 1",
}: DayVideoPageProps) => {
  const { context } = useParams();
  const [pageData, setPageData] =
    useState<{ url?: string; title?: string }[]>([]);
  const [pageTitle, setPageTitle] = useState<string>("");
  const navigate = useNavigate();
  const notQuestionContext : boolean = context === "videos" || context === "notes";
  const questionContext: boolean = context === "question";
  const setPageDataAndTitle = (context: string)=>{
    let newPageData: { url?: string; title?: string }[] = [];
    let newPageTitle: string = "";
    if(context==="videos") {
      newPageData = videosDataList;
      newPageTitle = "Videos"
    }
    else if (context === "notes") {
      newPageData = notesDataList;
      newPageTitle = "Notes";
    }
    else if(context === "question"){
      newPageTitle = "Questions";
    }
    setPageData(newPageData);
    setPageTitle(newPageTitle);
  }

  const setPageAndNavigate = (context : string)=>{
    setPageDataAndTitle(context);
    navigate(`/dayContext/${context}`);
  }
  useEffect(() => {
    setPageDataAndTitle(context || "");
  }, [context]);
  return (
    <div className={`main-daypage-container ${className}`}>
      <div className="main-title-div">{title}</div>
      <div className="content-navigation">
        <span
          className="naviagtor"
          onClick={() => {
            setPageAndNavigate("videos");
          }}
        >
          Videos
        </span>
        <span
          className="naviagtor"
          onClick={() => {
            setPageAndNavigate("question");
          }}
        >
          Questions
        </span>
        <span
          className="naviagtor"
          onClick={() => {
            setPageAndNavigate("notes");
          }}
        >
          Notes
        </span>
      </div>
      <div className="content-wrapper">
        <div className="videos-question-wrapper">
          <div className="videos-wrapper">
            {pageTitle && <div className="content-header">{pageTitle}</div>}
            {notQuestionContext &&
              pageData?.map((video) => {
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
            {questionContext &&
              questionsDataList?.map((ques) => (
                <div className="question-content-wrapper">
                  <div className="question-content">
                    <Accordion title={ques.title}>
                      <div>
                        {ques.options?.map((option: string) => (
                          <div>
                            <input id={option} type="checkbox" />
                            <label htmlFor={option}>{option}</label>
                          </div>
                        ))}
                      </div>
                    </Accordion>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayVideoPage;