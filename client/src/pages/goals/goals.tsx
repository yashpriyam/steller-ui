import { useEffect } from "react";
import { useGoals } from "../../redux/actions/goalsAction"
import Spinner from "../../components/spinner/spinner";
import "./goals.scss";
import { Button } from "../../components/button/button";
import NoDataFoundComponent from "../../components/noDataFound/noDataFound";
export const Goals = () => {
    const {getGoals,goals} = useGoals();
    const { goalsList, isGoalLoading } = goals || {};

    useEffect(() => {
        getGoals();
    },[])
    
    return <div className="goals-page-main-container">
            <div className="goals-page-sub-container">
        { isGoalLoading ? <Spinner/> : goalsList ? goalsList.map((data)=>(
            <div className="goals-list-main-wrapper">
                <span>{data?.goalType?.goalType}</span>
                <div>{data?.title}</div>
                <div>{data?.description}</div>
                <div>{data?.frequency}</div>
                <div>{data.startWeek?.weekNumber}</div>
                <div>{data?.endWeek?.weekNumber}</div>
                <Button text="start" className="goals-start-button"/>
            </div>
            ))
            : <NoDataFoundComponent message="No Goals Found"/>
        }
    </div>
    </div>
}