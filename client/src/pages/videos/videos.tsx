import { Card } from "../../components/card/card";
import React, { MouseEventHandler, useState } from "react";
import { videoDataList, filterDataList } from "./dataList";
import "./videos.scss";
interface VideosProps {
  videoData?: { title: string; subtitle?: string; tags?: string[] }[];
  className?: string;
  filterData?: { tag: string }[];
}

export const Videos: React.FC<VideosProps> = ({
  videoData=videoDataList,
  className,
  filterData=filterDataList,
}: VideosProps) => {
  const [filterTag, setFilterTag] = useState<string>("");

  

  return (
    <div className={`video-page ${className}`}>
      
      <div className="video-container">
        {videoData?.map((data) => {
          if (data.tags?.includes(filterTag) || filterTag === "") {
            return (
              <Card
                className={className}
                title={data.title}
                subtitle="subtitle"
                tags={data.tags}
                // tagPosition="center"
                img={
                  "https://framerusercontent.com/images/jQaRnWtpyFktrGE79EvFXdue7Gk.jpg?scale-down-to=2048"
                }
              ></Card>
            );
          } else return <></>;
        })}
      </div>
    </div>
  );
};
