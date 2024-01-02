import React, { useState } from "react";
import "./dayPage.scss";
interface DayPageProps {
  className?: string;
  title?: React.ReactNode | string;
  videosData?: { url?: string; title?: string }[];
  notesData?: { url?: string; title?: string }[];
}

export const DayPage: React.FC<DayPageProps> = ({
  className,
  title = "WEBMASTERS",
  videosData = [
    {
      url: "https://www.youtube.com/embed/Blsl-WBE3KU?si=z1fOZBOXQkxhrL_w&amp;controls=0",
      title: "HTML",
    },
  ],
  notesData = [{url: "https://slides.com/aleksandrasikora/olx-meetup-fets/embed", title: "HTML"}],
}: DayPageProps) => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const handleToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  };
  return (
    <div className={`main-daypage-container ${className}`}>
      <div className="title-div">{title}</div>
      <div className="content-wrapper">
        <div className={`videos-wrapper ${toggleSidebar && "expand-videos"}`}>
          <h1>Videos</h1>
          {videosData?.map((video) => {
            return (
              <div className="video-content-wrapper">
                <div className="video-content">
                  <iframe
                    // width="760"
                    // height="415"
                    src={video.url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="iframe-video"
                  ></iframe>
                  {/* <div className="iframe-video"></div> */}
                </div>
                <div className="video-title">{video.title}</div>
              </div>
            );
          })}
        </div>
        <div className="content-separator">
          <div className="line">
            <div
              className={`icon ${toggleSidebar && "rotate-icon"}`}
              onClick={handleToggleSidebar}
            >
              {">"}
            </div>
          </div>
        </div>
        <div className={`notes-wrapper ${toggleSidebar && "hide-notes"}`}>
          <h1>Notes</h1>
          {notesData?.map((note) => {
            return (
              <div className="note-content-wrapper">
                <div
                  className={`note-content ${toggleSidebar && "resize-height"}`}
                >
                  <iframe
                    // width="576"
                    // height="420"
                    src={note.url}
                    title="OLX Meetup: Typesafe REST with feTS"
                    scrolling="no"
                    frameBorder="0"
                    // webkitAllowFullScreen
                    // mozallowfullscreen
                    allowFullScreen
                    className="iframe-note"
                  ></iframe>
                  {/* <div className="iframe-note"></div> */}
                </div>
                <div className="note-title">Day 1 HTML</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};