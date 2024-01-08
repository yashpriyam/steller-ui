import React, {ReactElement} from "react"
import "./thought.scss"

export type Thoughts = {
    icon: ReactElement;
    thought: string;
    tag: string;
  };

interface thoughtsProps {
    thought_component_title?:string;
    thought_component_subtitle?:string;
    thought_element?: Thoughts[];
    
}

export const ThoughtComponent: React.FC<thoughtsProps> = ({
    thought_component_title,
    thought_component_subtitle,
    thought_element=[],
}: thoughtsProps) => {

    const thoughtElement =   thought_element.map((object, index) => {
        return (
          <div className="thought_element">
            <div className="thought-icon-box">{object.icon}</div>
            <div className="thought-element-text">
              <p className="thought">{object.thought}</p>
              <p className="thought-tag">{object.tag}</p>
            </div>
          </div>
        );
      });

    return(
        <div className="thoughts-container-outer">
          <div className="thought-container">
            <p className="thought-title">{thought_component_title}</p>
            <p className="thought-description">
                {thought_component_subtitle}
              
            </p>
            <div className="thought-box">
                {thoughtElement}
            </div>
          </div>
          <div className="subscribers-tabs">
            <div className="joinee-box">
              <p className="joinee-count">Join 1K+ Readers</p>
              <p className="write-ups">Sent out every two weeks. No spam.</p>
            </div>
            <div className="subscribe-box">
              <input className="email-input" placeholder="Your E-Mail" />
              <button className="subscriber-button">Subscribe</button>
            </div>
          </div>
        </div>
    )
};
