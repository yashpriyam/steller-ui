import "./schedulePage.scss";
import Accordion from "../../components/accordion/accordion";
import { Button } from "../../components/button/button";
import React, { useEffect, useState } from "react";
import { Filter } from "../../components/filter/filter";
import { useNavigate } from "react-router-dom";
import { useWeek } from "../../redux/actions/scheduleAction";
import { MeetIcon } from "../../icons/index";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { isCurrentDate } from "../../utils/index";
import Spinner from "../../components/spinner/spinner";
const checkboxDataList = ["HTML", "CSS", "JavaScript"];

const SchedulingPage: React.FC<SchedulePagePropsInterface> = ({
  className,
  style,
}: SchedulePagePropsInterface) => {
  const [filter, setFilter] = useState<string[]>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { weekData, getScheduleData } = useWeek();
  const { weekList, isScheduleDataLoading } = weekData;

  const handleNavigation = (
    e: React.MouseEvent<HTMLElement>,
    path?: string
  ) => {
    e.stopPropagation();
    if (path) navigate(path);
  };
  const onJoinMeetClick = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    getScheduleData({});
  }, []);
  return (
    <div className={`scheduling-page ${className}`} style={style}>
      {/* <Filter
        checkboxData={checkboxDataList}
        filter={filter}
      /> */}
      <div className="schedule-page-meet-container">
        <div onClick={onJoinMeetClick} className="schedule-page-meet-btn">
          <MeetIcon isDarkMode={true} />
          {t("join_meet")}
        </div>
      </div>
      <div className="schedule-page-header">{t("schedule_header") }</div>
      <div className="scheduling-page-accordion">
        {isScheduleDataLoading ? (
          <Spinner colors={["#D5B9B2", "#A26769", "#6D2E46"]}/>
        ) : (
          Boolean(weekList?.length) &&
          weekList.map((week, index) => {
            const {
              batchCode,
              days,
              description,
              isActive,
              isDisabledForUnpaidUsers,
              title,
              weekNumber,
            } = week;
            return (
              isActive && (
                <Accordion title={title} disabled={isDisabledForUnpaidUsers}>
                  <div key={index} className="accordion-content-wrapper">
                    {description && (
                      <div className="week-description">{description}</div>
                    )}
                    <div key={index} className="daylist-container">
                      {days?.map((day: DayDataType, index) => {
                        const {
                          dayNumber,
                          description,
                          title,
                          date,
                          topics: tags,
                          questions,
                          notes,
                          videos
                        } = day;
                        const tagsLength = tags?.length;
                        return (
                          <div
                            key={index}
                            className="day-container"
                            onClick={(e: React.MouseEvent<HTMLElement>) => {
                              handleNavigation(
                                e
                                // `/day/${dayNumber}?weekNumber=${weekNumber}`
                                // commented navigation to dayPage until data is inserted to it.
                              );
                            }}
                          >
                            <div className="day-header">
                              <strong className="day-title">{title}</strong>
                              {Boolean(tagsLength) && tagsLength && (
                                <div className="topic-tags">
                                  {tags
                                    ?.slice(0, 2)
                                    .map((tag: string, idx: number) => (
                                      <span
                                        className={`topic-tag ${tag.toLowerCase()}`}
                                      >
                                        {tag.toUpperCase()}
                                      </span>
                                    ))}
                                  {tagsLength === 3 && (
                                    <span
                                      className={`topic-tag ${tags[2]?.toLowerCase()}`}
                                    >
                                      {tags[2]?.toUpperCase()}
                                    </span>
                                  )}
                                  {tagsLength > 3 && (
                                    <>
                                      <span className="hidden-tags">
                                        {tags
                                          .slice(3)
                                          .map((tag, idx: number) => (
                                            <span
                                              className={`topic-tag  ${tag.toLowerCase()}`}
                                            >
                                              {tag.toUpperCase()}
                                            </span>
                                          ))}
                                      </span>
                                      <span className="topic-tag show-tags">{`+${
                                        tagsLength - 2
                                      }`}</span>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                            {description && (
                              <div className="day-description">
                                {description}
                              </div>
                            )}
                            <div className="buttons-wrapper">
                              <Button
                                text={t("questions")}
                                className="button"
                                onClick={(e) => {
                                  handleNavigation(
                                    e,
                                    `/question?weekNumber=${weekNumber}&dayNumber=${dayNumber}`
                                  );
                                }}
                                countLabel={questions?.length.toString()}
                                positionOfCountLabel="outside"
                                isDisabled={!questions?.length}
                                
                              />
                              <Button
                                text={t("notes")}
                                className="button"
                                onClick={(e) => {
                                  handleNavigation(
                                    e,
                                    `/notes?weekNumber=${weekNumber}&dayNumber=${dayNumber}`
                                  );
                                }}
                                countLabel={notes?.length.toString()}
                                positionOfCountLabel="outside"
                                isDisabled={!notes?.length}
                              />
                              {date && isCurrentDate(date) ? (
                                <Button
                                  text={t("join_todays_class")}
                                  className="button join-meet-btn"
                                  onClick={(e) => {
                                    handleNavigation(e, `/meet/class`);
                                  }}
                                />
                              ) : (
                                <Button
                                  text={t("videos")}
                                  className="button"
                                  onClick={(e) => {
                                    handleNavigation(
                                      e,
                                      `/videos?weekNumber=${weekNumber}&dayNumber=${dayNumber}`
                                    );
                                  }}
                                  countLabel={videos?.length.toString()}
                                  positionOfCountLabel="outside"
                                  isDisabled={!videos?.length}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Accordion>
              )
            );
          })
        )}
      </div>
    </div>
  );
};

export default SchedulingPage;
