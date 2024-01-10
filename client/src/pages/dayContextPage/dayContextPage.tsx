import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVideos } from "../../redux/actions/videosAction";
import { useNotes } from "../../redux/actions/notesAction";
import "./dayContextPage.scss";
import { useTranslation } from "react-i18next";
const DayVideoPage: React.FC<DayPagePropsInterface> = ({
  className,
  title,
}: DayPagePropsInterface) => {
  const { dayNumber, dayContent } = useParams();
  const [pageTitle, setPageTitle] = useState<string>("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { videoData, getAllVideos } = useVideos();
  const { noteData, getAllNotes } = useNotes();
  const { videoList } = videoData;
  const { noteList } = noteData;

  const navigationLinksData: string[] = ["videos", "questions", "notes"];
  const videoContext: boolean = dayContent === "videos";
  const notesContext: boolean = dayContent === "notes";
  const questionContext: boolean = dayContent === "questions";
  const setPageContentTitle = () => {
    let newPageTitle: string = "";
    if (videoContext) {
      newPageTitle = t("videos");
    } else if (notesContext) {
      newPageTitle = t("notes");
    }
    setPageTitle(newPageTitle);
  };

  const setPageAndNavigate = (dayContent: string) => {
    if (questionContext) {
      navigate(`/question?day=${dayNumber}`);
      return;
    }
    setPageContentTitle();
    navigate(`/day/${Number(dayNumber)}/${dayContent}`);
  };
  const getAllDataRequest = async (dayNumber: number) => {
    if (videoContext) await getAllVideos({ dayNumber });
    else if (notesContext) await getAllNotes({ dayNumber });
  };
  useEffect(() => {
    getAllDataRequest(Number(dayNumber));
    setPageContentTitle();
  }, [dayContent, dayNumber]);

  return (
    <div className={`main-daycontextpage-container ${className}`}>
      {(title || dayNumber) && (
        <div className="main-title-div">{title || `Day ${dayNumber}`}</div>
      )}
      <div className="content-navigation">
        {navigationLinksData.map((nav) => (
          <span
            className="navigator"
            onClick={() => {
              setPageAndNavigate(nav);
            }}
          >
            {t(nav)}
          </span>
        ))}
      </div>
      <div className="context-content-wrapper">
        {pageTitle && (
          <div className="context-content-header">
            <div className="context-title">{pageTitle}</div>
          </div>
        )}
        <div className="video-note-wrapper">
          {videoContext &&
            videoList.map((video) => {
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
                <div className="video-note-content-wrapper">
                  <div className="video-note-content">
                    <iframe
                      src={links?.youtube}
                      title={title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="context-iframe"
                    ></iframe>
                  </div>
                  <div className="content-text-wrapper">
                    {title && <div className="content-title">{title}</div>}
                    {description && (
                      <div className="content-title">{description}</div>
                    )}
                    {duration && (
                      <div className="content-title">{`Duration : ${duration}`}</div>
                    )}
                    {videoNumber && (
                      <div className="content-title">{`Video Number : ${videoNumber}`}</div>
                    )}
                  </div>
                </div>
              );
            })}
          {notesContext &&
            noteList.map((note) => {
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
                <div className="video-note-content-wrapper">
                  <div className="video-note-content">
                    <iframe
                      src={note.link}
                      title={note.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="context-iframe"
                    ></iframe>
                  </div>
                  <div className="content-text-wrapper">
                    {title && <div className="content-title">{title}</div>}
                    {description && (
                      <div className="content-title">{description}</div>
                    )}
                    {estimatedReadingTime && (
                      <div className="content-title">{`Estimated Reading Time : ${estimatedReadingTime}`}</div>
                    )}
                    {noOfPages && (
                      <div className="content-title">{`Total Numbers of Pages : ${noOfPages}`}</div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DayVideoPage;