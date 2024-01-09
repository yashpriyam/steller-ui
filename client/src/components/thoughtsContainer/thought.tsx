import React, {ReactElement} from "react"
import "./thought.scss"
import { useTranslation } from "react-i18next";

export const ThoughtComponent: React.FC<ThoughtsProps> = ({
    thoughtComponentTitle,
    thoughtComponentSubtitle,
    thoughtElement=[],
}: ThoughtsProps) => {
 const {t} = useTranslation()
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
              <p className="joinee-count">{t("join_1K+_readers")}</p>
              <p className="write-ups">{t("sent_out_every_two_weeks_no_spam")}</p>
            </div>
            <div className="subscribe-box">
              <input className="email-input" placeholder="Your E-Mail" />
              <button className="subscriber-button">{t("subscribe")}</button>
            </div>
          </div>
        </div>
    )
};
