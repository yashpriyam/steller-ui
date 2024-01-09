import React, {ReactElement} from "react"
import "./thought.scss"

export const ThoughtComponent: React.FC<ThoughtsProps> = ({
    thoughtComponentTitle,
    thoughtComponentSubtitle,
    thoughtElement=[],
}: ThoughtsProps) => {

    const thoughtData =   thoughtElement.map((items, index) => {
        return (
          <div className="thought_element">
            <div className="thought-icon-box">{items.icon}</div>
            <div className="thought-element-text">
              <p className="thought">{items.thought}</p>
              <p className="thought-tag">{items.tag}</p>
            </div>
          </div>
        );
      });

    return(
        <div className="thoughts-container-outer">
          <div className="thought-container">
            <p className="thought-title">{thoughtComponentTitle}</p>
            <p className="thought-description">
                {thoughtComponentSubtitle}
              
            </p>
            <div className="thought-box">
                {thoughtData}
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
