import React, { useContext } from 'react'
import "./FlowChart.scss";
import ImageComponent from "../ImageComponent/ImageComponent";
import FlowChartImage from "../../assets/images/flowChart.svg";
import FlowChartCircle from "../../assets/images/flowchartCircle.svg";
import { ThemeContext } from "../Themecontext/ThemeContext";

const FlowChart = () => {
  const { darkMode } = useContext(ThemeContext);

    return (
      <div
        id="OurJourney"
        className={
          darkMode ? "flowChart flowChartBlack" : "flowChart flowChartWhite"
        }
      >
        <ImageComponent
          className="flowChartPic"
          src={FlowChartImage}
          alt="flowChart"
        />
        <ImageComponent
          className="flowChartPicCircle"
          src={FlowChartCircle}
          alt={"FlowChartCircle"}
        />
      </div>
    );
}

export default FlowChart
