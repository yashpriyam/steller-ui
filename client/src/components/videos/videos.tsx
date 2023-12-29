import { Card } from "../card/card";
import React, { useState } from "react";
import "./videos.scss";
interface VideosProps {
  videoData?: { title: string; subtitle?: string; tags?: string[] }[];
  className?: string;
  filterData?: { tag: string }[];
}

export const Videos: React.FC<VideosProps> = ({
  videoData = [
    {
      title: "title1",
      tags: ["html", "react"],
    },
    {
      title: "title2",
      tags: ["html", "css"],
    },
    {
      title: "title3",
      tags: ["js", "react"],
    },
    {
      title: "title4",
      tags: ["html", "js", "react"],
    },
    {
      title: "title5",
      tags: ["html", "js"],
    },
  ],
  className,
  filterData = [
    { tag: "html" },
    { tag: "js" },
    { tag: "css" },
    { tag: "react.js" },
    { tag: "node.js" },
    { tag: "express.js" },
    { tag: "mongoose" },
    { tag: "video" },
    { tag: "video" },
    { tag: "video" },
  ],
}: VideosProps) => {
  const [filterTag, setFilterTag] = useState<string>("");
  const handleClick = (event: Event) => {
    const target = event.target as HTMLElement;

    if (target instanceof HTMLElement) {
      const innerTextValue: string = target.innerText;
      console.log({ innerTextValue });
      setFilterTag(innerTextValue);
    }
  };

  return (
    <div className={`video-page ${className}`}>
      <div className="filter-container">
        <div className="filter-wrapper">
          {filterData?.map((data) => {
            return (
              <span className="filter-tag" 
              onClick={handleClick}
              >
                {data.tag}
              </span>
            );
          })}
        </div>
      </div>
      <div className="video-container">
        {videoData?.map((data) => {
          if (data.tags?.includes(filterTag))
            return (
              <Card
                className={className}
                title={data.title}
                subtitle="subtitle"
                tags={data.tags}
                img={
                  "https://framerusercontent.com/images/jQaRnWtpyFktrGE79EvFXdue7Gk.jpg?scale-down-to=2048"
                }
              >
                {/* <div>{data.title}</div>
              <button>close</button> */}
              </Card>
            );
        })}
      </div>
    </div>
  );
};
