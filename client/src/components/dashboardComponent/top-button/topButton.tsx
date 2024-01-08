import React from "react";
import "./topButton.scss";
interface topButtonProps {
  top_button_tag_one?:string;
  top_button_tag_two?:string;
}

export const TopButtons: React.FC<topButtonProps>=({
  top_button_tag_one,
  top_button_tag_two,
}:topButtonProps)=>{
    return(
        <div className="top-button-container">
        <div className="top-button">
          <button className="about-button"> {top_button_tag_one} </button>
          <button className="Email-button"> {top_button_tag_two} </button>
        </div>
      </div>
    );
}