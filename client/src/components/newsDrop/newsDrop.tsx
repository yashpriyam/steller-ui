import React from "react";
import "./newsDrop.scss";

export const NewsDrop: React.FC<NewsDropProps> = ({
  newsDropTitile,
  newsDropElements = [],
}: NewsDropProps) => {
  const newsDropData = newsDropElements.map((items, index) => {
    return (
      <div className="images-card">
        <div className="image-div">
          <img className="news-image" src={items.image} />
        </div>
        <div className="image-title-data">
          <p className="titles-image">{items.title}</p>
          <p className="image-description">{items.description}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="news-drops">
      <p className="titles-news-drops">{newsDropTitile}</p>
      <div className="image-card-box">{newsDropData}</div>
    </div>
  );
};
