import "./scheduling.scss";
import Accordion from "../../components/accordion/accordion";
import { Button } from "../../components/button/button";
import { accordionDataList, checkboxDataList } from "./accordionDataList";
import React from "react";

interface SchedulingPageProps {
  className?: string;
  accordionData?: {
    title?: string;
    description?: string;
    days?: {
      title?: string;
      description?: string;
      videoUrl?: string;
      notesUrl?: string;
      assignmentUrl?: string;
      tags?: {
        tagName?: string;
        class?: string;
      }[];
    }[];
  }[];
  checkboxData?: string[];
  style?: object;
}

const Scheduling: React.FC<SchedulingPageProps> = ({
  className,
  accordionData = accordionDataList,
  checkboxData = checkboxDataList,
  style,
}: SchedulingPageProps) => {
  return (
    <div className="scheduling-page">
      <div className="scheduling-page-filter-container">
        <div className="filter-sub-container">
          <label className="filter-heading">Filter</label>
          <div className="checkbox-content">
            {checkboxData.map((option) => (
              <div className="checkbox-wrapper">
                <input type="checkbox" id={option} />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="scheduling-page-accordion">
        {accordionData.map((accordion, index) => (
          <Accordion
            title={accordion.title}
            key={index}
            style={{ backgroundColor: "black", color: "white" }}
          >
            <div className="parent">
              <div className="schedule-accordion-column-1">
                <div>{accordion.description}</div>
                <div>This must be a text</div>
              </div>
              <div className="daylist-container-column-2">
                {accordion?.days?.map((dayInfo, index) => (
                  <div className="day-container">
                    <div className="accordion-button-container">
                      <div className="day-header">
                        <strong className="title">{dayInfo.title}</strong>
                        <div className="topic-tags">
                          {dayInfo?.tags
                            ?.slice(0, 2)
                            .map((tag, idx: number) => (
                              <span key={idx} className={`tag ${tag.class}`}>
                                {tag.tagName}
                              </span>
                            ))}
                          {dayInfo?.tags?.length === 3 && (
                            <span className={`tag ${dayInfo.tags[2].class}`}>
                              {dayInfo.tags[2].tagName}
                            </span>
                          )}
                          {dayInfo?.tags?.length && dayInfo.tags.length > 3 && (
                            <>
                              <span className="hidden-tags">
                                {dayInfo.tags
                                  .slice(3)
                                  .map((tag, idx: number) => (
                                    <span
                                      key={idx}
                                      className={`tag  ${tag.class}`}
                                    >
                                      {tag.tagName}
                                    </span>
                                  ))}
                              </span>
                              <span className="tag show-tags">{`+${
                                (dayInfo?.tags?.length) - 2
                              }`}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <p className="description">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Saepe nisi velit repudiandae ad fuga accusamus.{" "}
                      </p>
                      <div className="btn-wrapper">
                        <Button text="Assignments" className="red-btns btn" />
                        <Button text="Notes" className="notes-btns btn" />
                        <Button text="Videos" className="youtube-btns btn" />
                        <Button text="Links" className="yellow-btns btn" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Scheduling;
