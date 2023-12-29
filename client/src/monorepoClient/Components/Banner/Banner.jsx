import React from "react";
import "./Banner.scss";

const Banner = ({ text, showCloseBtn, onClose, className, style }) => {
  return (
    <a style={{ textDecoration: "none" }} href="/#contact-us">
      <div style={style} className={`bannerComponentContainer ${className}`}>
        <div className="bannerText">{text}</div>
        {showCloseBtn && (
          <button className="bannerCloseBtn" onClick={onClose}>
            &times;
          </button>
        )}
      </div>
    </a>
  );
};

export default Banner;
