import React from "react";
import "./topButton.scss";


export const TopButtons: React.FC<TopButtonProps> = ({
  topButtonTagOne,
  topButtonTagTwo,
}: TopButtonProps) => {
  return (
    <div className="top-button-container">
      <div className="top-button">
        <button className="about-button"> {topButtonTagOne} </button>
        <button className="email-button"> {topButtonTagTwo} </button>
      </div>
    </div>
  );
};
