import React, { useEffect, useState } from "react";
import { ButtonComponent } from "../Button/Button";
import "./DropDownComponent.scss";
import UpwardArrow from "../../assets/images/upwardIcon.svg";
import DownwardArrow from "../../assets/images/downwardIcon.svg";
import ImageComponent from "../ImageComponent/ImageComponent";
import { useLocation } from "react-router-dom";
// import RightWardArror from "../../assets/images/rightwardArrow.svg";
const DropDownComponent = ({
  question = "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut ?",
  answer = "Lorem ipsum dolor sit amet, consectetur ad .",
  id,
}) => {
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    setOpen(location.hash === `#${id}`);
  }, [location, id]);
  return (
    <div id={id} className="dropDownComponent">
      <div onClick={() => setOpen((prev) => !prev)} className="questionText">
        <p>{question}</p>
        <ButtonComponent className="dropdownBtn">
          <ImageComponent
            src={isOpen ? UpwardArrow : DownwardArrow}
            alt={isOpen ? "DownwardArrow" : "UpwardArrow"}
          />
        </ButtonComponent>
        
      </div>
      {isOpen && (
        <div className="answerText">
          {/* <ImageComponent src={RightWardArror} alt={"RightWardArror"} /> */}
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default DropDownComponent;
