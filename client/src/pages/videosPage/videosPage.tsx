import { Card } from "../../components/card/card";
import React, { useEffect, useState } from "react";
import { filterDataList } from "./dataList";
import { FilterTags } from "../../components/filterTags/filterTags";
import { useVideos } from "../../redux/actions/videosAction";
import "./videosPage.scss";
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

  const getAllVideosRequest = async () => {
    await getAllVideos({});
  };
  useEffect(() => {
    getAllVideosRequest();
  }, []);
  const { videoList } = videoData;

  return (
    <div className={`video-page ${className}`}>
      <FilterTags
        filterData={filterData}
        setFilterTag={setFilterTag}
        filterTag={filterTag}
      />
      <div className="videos-container">
        <div className="content-title">VIDEOS</div>
        <div className="videos-wrapper">
          {videoList.map(
            (video) =>
              (video.topics?.includes(filterTag) || filterTag === "") && (
                <Card
                  className={className}
                  tagPosition="left"
                  data={video}
                >
                </Card>
              )
          )}
        </div>
      </div>
    </div>
  );
};
export default VideosPage;