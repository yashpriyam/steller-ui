import { Card } from "../../components/card/card";
import React, { useState } from "react";
import { videoDataList, filterDataList } from "./dataList";
import "./videosPage.scss";
import { FilterTags } from "../../components/filterTags/filterTags";
interface VideosPageProps {
  videoData?: { title: string; subtitle?: string; tags?: string[] }[];
  className?: string;
  filterData?: { tag: string }[];
}

const VideosPage: React.FC<VideosPageProps> = ({
  videoData = videoDataList,
  className,
  filterData = filterDataList,
}: VideosPageProps) => {
  const [filterTag, setFilterTag] = useState<string>("");

  return (
    <div className={`video-page ${className}`}>
      <FilterTags
        filterData={filterData}
        setFilterTag={setFilterTag}
        filterTag={filterTag}
      />
      <div className="videos-notes-container">
        <div className="content-title">VIDEOS</div>
        <div className="videos-wrapper">
          {videoData?.map(
            (data) =>
              (data.tags?.includes(filterTag) || filterTag === "") && (
                <Card
                  className={className}
                  title={data.title}
                  subtitle="subtitle"
                  tags={data.tags}
                  tagPosition="left"
                  img={
                    "https://framerusercontent.com/images/jQaRnWtpyFktrGE79EvFXdue7Gk.jpg?scale-down-to=2048"
                  }
                ></Card>
              )
          )}
        </div>
      </div>
    </div>
  );
};
export default VideosPage;