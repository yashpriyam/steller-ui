import { Card } from "../../components/card/card";
import React, { useEffect, useState } from "react";
import { filterDataList } from "./dataList";
import "./videosPage.scss";
import { FilterTags } from "../../components/filterTags/filterTags";
import { useVideos } from "../../redux/actions/videosAction";
interface VideosPageProps {
  className?: string;
  filterData?: { tag: string }[];
}

const VideosPage: React.FC<VideosPageProps> = ({
  className,
  filterData = filterDataList,
}: VideosPageProps) => {
  const [filterTag, setFilterTag] = useState<string>("");
  const { videoData, getAllVideos } = useVideos();

  const getVideosFunc = async ()=>{
    await getAllVideos({});
  }
  useEffect(() => {
    getVideosFunc();
  }, []);
  console.log({videoData});
  

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
          {videoData.videoList.map(
            (video) =>
              (video.topics?.includes(filterTag) || filterTag === "") && (
                <Card
                  className={className}
                  tagPosition="left"
                  data={video}
                ></Card>
              )
          )}
        </div>
      </div>
    </div>
  );
};
export default VideosPage;