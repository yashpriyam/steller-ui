import React, { useEffect, useState } from "react";
import "./LeftRegisterPageComponent.scss";
const LeftRegisterPageComponent = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const updateWidthAndHeight = () => {
    console.info(screenWidth);
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });
  return (
    <div className="leftRegisterPage">
      <div className="container">
        <div className="heading">
          <h1>
            <span style={{ color: "black" }}>Hi!</span> We're glad you decided
            to join WebMasters.
          </h1>
          <br />
          <h2>Tell us a bit about yourself.</h2>
        </div>
      </div>
    </div>
  );
};

export default LeftRegisterPageComponent;
