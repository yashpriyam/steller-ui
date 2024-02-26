import { useEffect } from "react";
import { useGoals } from "../../redux/actions/goalsAction";
import Spinner from "../../components/spinner/spinner";
import "./goals.scss";
import { Button } from "../../components/button/button";
import NoDataFoundComponent from "../../components/noDataFound/noDataFound";
import { UserGoalResponseComponent } from "../../components/userResponse/userResponse";
import { useUserGoals } from "../../redux/actions/getUserGoalsAction";
export const Goals = () => {
  const { getGoals, goals } = useGoals();
  const { goalsList, isGoalLoading } = goals || {};
  const {getUserGoals, userGoals} = useUserGoals()

  useEffect(() => {
    getGoals();
    getUserGoals();
  }, []);  
  return (
    <div className="goals-page-main-container">
      <div className="goals-page-sub-container">
        {isGoalLoading ? (
          <Spinner />
        ) : goalsList ? (
          goalsList.map((data) => (  
            <div className="goals-list-main-wrapper">
              <div className="goals-data-key-value-wrapper">
                <span className="goals-data-key">Goal Category</span>
                <span className="goals-data-value">
                  {data?.goalType?.goalType}
                </span>
              </div>
              <div className="goals-data-key-value-wrapper">
                <span className="goals-data-key">Title</span>
                <span className="goals-data-value">{data?.title}</span>
              </div>
              <div className="goals-data-key-value-wrapper">
                <span className="goals-data-key">Description</span>
                <span className="goals-data-value">{data?.description}</span>
              </div>
              <div className="goals-data-key-value-wrapper">
                <span className="goals-data-key">Frequency</span>
                <span className="goals-data-value">{data?.frequency}</span>
              </div>
              <div className="goals-data-key-value-wrapper">
                <span className="goals-data-key">Start week of Goal</span>
                <span className="goals-data-value">
                  {data.startWeek?.weekNumber}
                </span>
              </div>
              <div className="goals-data-key-value-wrapper">
                <span className="goals-data-key">End week of Goal</span>
                <span className="goals-data-value">
                  {data?.endWeek?.weekNumber}
                </span>
              </div>
              {data.isActive && (
               <UserGoalResponseComponent goalId={data._id ?? ''} profileType={data.profileType} />
              )}
            </div>
          ))
        ) : (
          <NoDataFoundComponent message="No Goals Found" />
        )}
      </div>
    </div>
  );
};