import "./schedulePage.scss";
import Accordion from "../../components/accordion/accordion";
import { Button } from "../../components/button/button";
import React, { useEffect, useState } from "react";
import { Filter } from "../../components/filter/filter";
import { useNavigate } from "react-router-dom";
import { useWeek } from "../../redux/actions/scheduleAction";
import { MeetIcon, PremiumMemberIcon } from "../../icons/index";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { sortDirection, convertDateToString, isCurrentDate, weekSortBy } from "../../utils/index";
import Spinner from "../../components/spinner/spinner";
import { useMeeting } from "../../redux/actions/meetingAction";
import { useUser } from "../../redux/actions/userAction";
import { Text } from "../../components/text/text";
const checkboxDataList = ["HTML", "CSS", "JavaScript"];

const SchedulingPage: React.FC<SchedulePagePropsInterface> = ({
  className,
  style,
}: SchedulePagePropsInterface) => {
  const { desc } = sortDirection;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { weekData, getScheduleData } = useWeek();
  const { weekList, isScheduleDataLoading } = weekData;
  const { getMeeting } = useMeeting();
  const { user } = useUser();
  const { isPaidUser,isAdmin } = user || {};
  const { accessWeeks } = isPaidUser || {};
  const [meetingData, setMeetingData] = useState<MeetingDataType | null>(null);
  const [filter, setFilter] = useState<GetScheduleDataType>({});

  const handleNavigation = (
    e: React.MouseEvent<HTMLElement>,
    path?: string,
    title?: string,
    description?: string
  ) => {
    e.stopPropagation();
    if (path) navigate(path, { state: { title, description } });
  };
  const onJoinMeetClick = () => {
    navigate("/dashboard");
  };

  const onJoinTodayClassMeetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/meet/class",  { state: { meetingData } });
  }

  const getTodayClassMeeting = async() => {
    const { status, response } = await getMeeting('class');
    const meetingDetails = response?.data?.getMeeting?.meetingData;
    if(status === 200 && meetingDetails){
      setMeetingData(meetingDetails);
    }
  }
  const navigateToPayment = ()=>navigate("/userPayment");

  useEffect(() => {
    getScheduleData(filter);
    setFilter({accessWeeks,weekFilterData: {}, sortData: {sortOrder: desc, sortBy: weekSortBy.date}})
    getTodayClassMeeting();
  }, [accessWeeks]);

  useEffect(()=>{
   getScheduleData(filter)
 },[filter])
  return (
    <div className={`schedule-page-container ${className}`} style={style}>
      <div className="schedule-page-sub-container">
      <div className="schedule-page-meet-container">
        <div onClick={onJoinMeetClick} className="schedule-page-meet-btn">
          <MeetIcon isDarkMode={true} />
          {t("join_meet")}
        </div>
      </div>
      <div className="schedule-page-header-filter-wrapper">
        <Text textType="h1">
        {t("schedule_header")}
          </Text>
        <Filter filter={filter} setFilter={setFilter}/>
      </div>
      <div className="scheduling-page-accordion">
        {isScheduleDataLoading ? (
          <Spinner />
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
            const isWeekIncluded = weekNumber && !accessWeeks?.includes(weekNumber);
            const weekTitle = title;
            return (
              isActive && (
                <Accordion defaultOpen={true} title={
                    <div className="schedule-week-title">
                      <Text textType="h2">{title}</Text>
                     </div>
                } disabled={isDisabledForUnpaidUsers} className={`${isWeekIncluded && !isAdmin && "pro-membership-weeks-wrapper"}`}>
                  <div key={index} className="accordion-content-wrapper">
                    {description && (
                      <div className="week-description">{description}</div>
                    )}
                    <div key={index} className="daylist-container">
                      { days ? days.map((day: DayDataType, index) => {
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
                                // `/day?dayNumber=${dayNumber}&weekNumber=${weekNumber}`
                              );
                            }}
                          >
                            <div className="day-header">
                              <div className="day-title-and-date-wrapper">
                                <strong className="day-title">{title}</strong>
                                {date && (
                                  <span className="day-date-info">
                                    {convertDateToString(date)}
                                  </span>
                                )}
                              </div>
                              {Boolean(tagsLength) && tagsLength && (
                                <div className="topic-tags">
                                  {tags
                                    ?.slice(0, 2)
                                    .map((tag: string, idx: number) => (
                                      <span
                                        key={idx}
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
                                    `/question?weekNumber=${weekNumber}&dayNumber=${dayNumber}`,
                                    weekTitle,
                                    description
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
                              {date && meetingData && isCurrentDate(date) ? (
                                <Button
                                  text={t("join_todays_class")}
                                  className="button join-meet-btn"
                                  onClick={onJoinTodayClassMeetClick}
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
                              <Button
                                text={t("DSA")}
                                className="button"
                                onClick={(e) => {
                                  handleNavigation(
                                    e,
                                    `/dsa-questions?weekNumber=${weekNumber}&dayNumber=${dayNumber}`
                                  );
                                }}
                                // countLabel={videos?.length.toString()}
                                // positionOfCountLabel="outside"
                                // isDisabled={!videos?.length}
                              />
                            </div>
                          </div>
                        );
                      })
                    : <span className="pro-membership-info-container" onClick={navigateToPayment}>
                        <span className="pro-membership-info-text">
                          {t("pro_membership_access_message")}
                        </span>
                        <PremiumMemberIcon/>
                      </span>
                    }
                    </div>
                  </div>
                </Accordion>
              )
            );
          })
        )}
      </div>
      </div>
    </div>
  );
};

export default SchedulingPage;
