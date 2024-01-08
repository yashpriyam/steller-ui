import React from "react";
import "./newsDrop.scss"
export type newsDrop = {
  image: string;
  title: string;
  description: string;
};

interface newsDropProps {
  news_drop_titile?:string;
  news_drop_elements?: newsDrop[];
}

export const NewsDrop: React.FC<newsDropProps> = ({
  news_drop_titile,
  news_drop_elements = [],
}: newsDropProps) => {
  const newsDropElements = news_drop_elements.map((object, index) => {
    return (
      <div className="images-card">
        <div className="image-div">
          <img className="news-image" src={object.image} />
        </div>
        <div className="image-title-data">
          <p className="titles-image">{object.title}</p>
          <p className="image-description">{object.description}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="news-drops">
      <p className="titles-news-drops">{news_drop_titile}</p>
      <div className="image-card-box">{newsDropElements}</div>
    </div>
  );
};
