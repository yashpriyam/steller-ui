import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useVideos } from "../../redux/actions/videosAction";
import { useNotes } from "../../redux/actions/notesAction";
import "./dayContextPage.scss";
const DayVideoPage: React.FC<DayPagePropsInterface> = ({
  className,
  title,
}: DayPagePropsInterface) => {
  const { context } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dayNumber = Number(searchParams.get("day"));
  console.log(dayNumber);
  const [pageTitle, setPageTitle] = useState<string>("");
  const navigate = useNavigate();
  const { videoData, getAllVideos } = useVideos();
  const { noteData, getAllNotes } = useNotes();
  const { videoList } = videoData;
  const { noteList } = noteData;

  const videoContext: boolean = context === "videos";
  const notesContext: boolean = context === "notes";
  const questionContext: boolean = context === "question";
  const setPageContentTitle = () => {
    let newPageTitle: string = "";
    if (videoContext) {
      newPageTitle = "Videos";
    } else if (notesContext) {
      newPageTitle = "Notes";
    }
    setPageTitle(newPageTitle);
  };

  const setPageAndNavigate = (context: string) => {
    if (questionContext) navigate("question");
    setPageContentTitle();
    navigate(`/dayContext/${context}?day=${dayNumber}`);
  };
  const getAllDataRequest = async (dayNumber: number) => {
    if (videoContext) await getAllVideos({ dayNumber });
    else if (notesContext) await getAllNotes({ dayNumber });
  };
  useEffect(() => {
    getAllDataRequest(dayNumber);
    setPageContentTitle();
  }, [context]);

  return (
    <div className={`main-daycontextpage-container ${className}`}>
      {(title || dayNumber) && (
        <div className="main-title-div">{title || `Day ${dayNumber}`}</div>
      )}
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
            navigate(`/question?day=${dayNumber}`);
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
      <div className="context-content-wrapper">
        {pageTitle && (
          <div className="context-content-header">
            <div className="context-title">{pageTitle}</div>
          </div>
        )}
        <div className="video-note-wrapper">
          {videoContext &&
            videoList.map((video) => {
              return (
                <div className="video-note-content-wrapper">
                  <div className="video-note-content">
                    <iframe
                      src={video.links?.youtube}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="context-iframe"
                    ></iframe>
                  </div>
                  <div className="content-text-wrapper">
                    <div className="content-title">{video.title}</div>
                  </div>
                </div>
              );
            })}
          {notesContext &&
            noteList.map((note) => {
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
                    <div className="content-title">{note.title}</div>
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
