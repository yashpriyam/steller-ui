import { Card } from "../../components/card/card";
import React, { useEffect, useState, useTransition } from "react";

import { FilterTags } from "../../components/filterTags/filterTags";
import { useVideos } from "../../redux/actions/videosAction";
import "./videosPage.scss";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/spinner/spinner";

const VideosPage: React.FC = () => {
  const [filterTagMap, setFilterTagMap] = useState<Record<string, boolean>>({
    HTML: false,
    CSS: false,
    JS: false,
    REACT: false,
    NODE: false,
    MONGODB: false,
  });
  const { videoData, getAllVideos } = useVideos();
  const { t } = useTranslation();

  const handleFilter = (value: string) => {
    const tempFilterTagMap = { ...filterTagMap };
    tempFilterTagMap[value] = !tempFilterTagMap[value];
    setFilterTagMap(tempFilterTagMap);
  };
  const queryParams = new URLSearchParams(location.search);
  const dayNumber = queryParams.get("dayNumber");
  const weekNumber = queryParams.get("weekNumber");
  const getAllVideosRequest = async () => {
     weekNumber && dayNumber
       ? getAllVideos({ weekNumber: Number(weekNumber), dayNumber: Number(dayNumber) })
       : getAllVideos({});
  };
  useEffect(() => {
    getAllVideosRequest();
  }, []);
  const { videoList } = videoData;

  const isVideoTagCheckedInFilterTag = (tagList: string[]) => {
    let isAllTagsExists = true;
    Object.entries(filterTagMap).map(([tag, isTagChecked]) => {
      if (isTagChecked && !tagList.includes(tag)) {
        isAllTagsExists = false;
      }
    });
    return isAllTagsExists;
  };
  const isAnyFilterApplied = Object.values(filterTagMap).some((tag) => tag);

  return (
    <div className={`video-page`}>
      <div className="content-title">{t("videos").toUpperCase()}</div>
      <FilterTags setFilterTag={handleFilter} filterTagMap={filterTagMap} />
      <div className="videos-wrapper">
        {!videoList?.length && <Spinner />}
        {videoList?.map(
          (video) =>
            /* TODO: @dhananjay - Instead of using this filter, need to do an API call  */
            (isVideoTagCheckedInFilterTag(video?.topics || []) ||
              !isAnyFilterApplied) && (
              <Card tagPosition="left" data={video}></Card>
            )
        )}
      </div>
    </div>
  );
};
export default VideosPage;
