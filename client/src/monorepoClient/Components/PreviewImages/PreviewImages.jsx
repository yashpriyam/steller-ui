import React from "react";
import "./PreviewImages.scss";
// import preview1 from "../../assets/images/preview1.svg";
import preview2 from "../../assets/images/hero_section_2.png";
// import preview3 from "../../assets/images/preview3.svg";
import ImageComponent from "../ImageComponent/ImageComponent";
const PreviewImages = () => {
  return (
    <div className="previewImages">
      {/* <ImageComponent className="preview1" src={preview1} alt="preview1" /> */}
      <ImageComponent className="preview2" src={preview2} alt="preview2" />
      {/* <ImageComponent className="preview1" src={preview1} alt="preview1" /> */}
      {/* <ImageComponent className="preview3" src={preview3} alt="preview3" /> */}
    </div>
  );
};

export default PreviewImages;
