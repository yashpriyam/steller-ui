import "./schedulingPage.scss";
import Accordion from "../../components/accordion/accordion";
import { Button } from "../../components/button/button";
import { accordionDataList } from "./accordionDataList";
import React from "react";
import { Filter } from "../../components/filter/filter";

interface SchedulingPageProps {
  className?: string;
  style?: object;
  accordionData?: {
    title?: string;
    description?: string;
    isDisabled?: boolean;
    days?: {
      title?: string;
      description?: string;
      videoUrl?: string;
      notesUrl?: string;
      assignmentUrl?: string;
      tags?: {
        tagName?: string;
      }[];
    }[];
  }[];
}

const SchedulingPage: React.FC<SchedulingPageProps> = ({
  className,
  accordionData = accordionDataList,
  style,
}: SchedulingPageProps) => {
  return (
    <div className={`scheduling-page ${className}`} style={style}>
      <Filter />
      <div className="scheduling-page-accordion">
        {accordionData.map((accordion, index) => (
          <Accordion title={accordion.title} disabled={accordion.isDisabled}>
            <div className="accordion-content-wrapper">
              <div className="accordion-description">
                {accordion.description}
              </div>
              <div className="daylist-container">
                {accordion?.days?.map((dayInfo, index) => {
                  const tags = dayInfo?.tags;
                  const tagsLength = tags?.length;
                  return (
                    <div className="day-container">
                      <div className="day-header">
                        <strong className="day-title">{dayInfo.title}</strong>
                        <div className="topic-tags">
                          {tags?.slice(0, 2).map((tag, idx: number) => (
                            <span
                              className={`topic-tag ${tag.tagName?.toLowerCase()}`}
                            >
                              {tag.tagName}
                            </span>
                          ))}
                          {tagsLength && tagsLength === 3 && (
                            <span
                              className={`topic-tag ${tags[2].tagName?.toLowerCase()}`}
                            >
                              {tags[2].tagName}
                            </span>
                          )}
                          {tagsLength && tagsLength > 3 && (
                            <>
                              <span className="hidden-tags">
                                {tags.slice(3).map((tag, idx: number) => (
                                  <span
                                    className={`topic-tag  ${tag.tagName?.toLowerCase()}`}
                                  >
                                    {tag.tagName}
                                  </span>
                                ))}
                              </span>
                              <span className="topic-tag show-tags">{`+${
                                tags?.length - 2
                              }`}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <p className="day-description">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Saepe nisi velit repudiandae ad fuga accusamus.
                      </p>
                      <div className="buttons-wrapper">
                        <Button text="Assignments" className="button" />
                        <Button text="Notes" className="button" />
                        <Button text="Videos" className="button" />
                        <Button text="Links" className="button" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default SchedulingPage;
