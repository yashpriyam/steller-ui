import React, {useState} from "react";
import "./stackComponent.scss";

export const StackComponent: React.FC<StackComponentProps> = ({
    stackComponentTitle,
    stackComponentSubtitle,
    stackElement=[],

}: StackComponentProps) => {
    const [stackAllActive, setStackAllActive] = useState<Boolean>(false);
  const [stackViewButtonText, setStackViewButtonText] =
    useState<String>("View all");

    const stackAllActiveTrue = stackElement.map((items, index) => {
      return (
        <div className="stack-element">
          <div className="stack-icon-box">
            <img className="stack-icon-image" src={items.icon} alt="" />
          </div>
          <div className="element-title-box">
            <p className="elemet-box-title">{items.title}</p>
            <p className="element-box-subtitle">
              {items.subtitle}
            </p>
          </div>
        </div>
      );
    })

    const stackAllActiveFalse = stackElement.slice(0, 4).map((items, index) => {
      return (
        <div className="stack-element">
          <div className="stack-icon-box">
            <img className="stack-icon-image" src={items.icon} alt="" />
          </div>
          <div className="element-title-box">
            <p className="elemet-box-title">{items.title}</p>
            <p className="element-box-subtitle">
              {items.subtitle}
            </p>
          </div>
        </div>
      );
    })

    return(
        <div className="stack-container">
          <div className="stack-title-box">
            <p className="stack-title">{stackComponentTitle}</p>
            <p className="stack-subtitle">{stackComponentSubtitle}</p>
          </div>
          <div className="stack-element-box">
            {stackAllActive
              ? stackAllActiveTrue
              : stackAllActiveFalse}
          </div>
          <div className="stack-button-container">
            <div
              className="view-all-button"
              onClick={() => {
                setStackAllActive(!stackAllActive);
                stackAllActive
                  ? setStackViewButtonText("View all")
                  : setStackViewButtonText("View less");
              }}
            >
              {stackViewButtonText}
            </div>
          </div>
        </div>
    )
};
