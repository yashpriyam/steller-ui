import React, {useState} from "react";
import "./stackComponent.scss";

export type StackBox = {
    icon: string;
    title: string;
    subtitle: string;
  };

interface stackComponentProps {
    stack_component_title?: string;
    stack_component_subtitle?: string;
    stack_element?: StackBox[];
}

export const StackComponent: React.FC<stackComponentProps> = ({
    stack_component_title,
    stack_component_subtitle,
    stack_element=[],

}: stackComponentProps) => {
    const [stackAllActive, setStackAllActive] = useState<Boolean>(false);
  const [stackViewButtonText, setStackViewButtonText] =
    useState<String>("View all");

    return(
        <div className="stack-container">
          <div className="stack-title-box">
            <p className="stack-title">{stack_component_title}</p>
            <p className="stack-subtitle">{stack_component_subtitle}</p>
          </div>
          <div className="stack-element-box">
            {stackAllActive
              ? stack_element.map((object, index) => {
                  return (
                    <div className="stack-element">
                      <div className="stack-icon-box">
                        <img className="stack-icon-image" src={object.icon} />
                      </div>
                      <div className="element-title-box">
                        <p className="elemet-box-title">{object.title}</p>
                        <p className="element-box-subtitle">
                          {object.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })
              : stack_element.slice(0, 4).map((object, index) => {
                  return (
                    <div className="stack-element">
                      <div className="stack-icon-box">
                        <img className="stack-icon-image" src={object.icon} />
                      </div>
                      <div className="element-title-box">
                        <p className="elemet-box-title">{object.title}</p>
                        <p className="element-box-subtitle">
                          {object.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
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
