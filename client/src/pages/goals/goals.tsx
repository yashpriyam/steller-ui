import { useEffect, useState } from "react";
import { useGoals } from "../../redux/actions/goalsAction"
import Spinner from "../../components/spinner/spinner";
import "./goals.scss";
import { Button } from "../../components/button/button";
import NoDataFoundComponent from "../../components/noDataFound/noDataFound";
export const Goals = () => {
    const {getGoals,goals} = useGoals();
    const { goalsList, isGoalLoading } = goals || {};
    const [showableDataOfGoals, setShowAbleDataOfGoals] = useState<Partial<GoalsType>[]>();
    const goalDetailsToshow = [ "batchCode","title","description","frequency"];
    const getShowableData = () => {
        const showableData = goalsList?.map((data)=>({
            title : data.title,
            description : data.description,
            frequency : data.frequency,
            startWeek : data.startWeek,
            endWeek : data.endWeek,
        }))
        return showableData;
    }
    useEffect(() => {
        getGoals();
    },[])
    useEffect(() => {
        setShowAbleDataOfGoals(getShowableData());
    },[goals])
    return <div className="goals-page-main-container">
            <div className="goals-page-sub-container">
        { isGoalLoading ? <Spinner/> : showableDataOfGoals ? showableDataOfGoals.map((data)=>(
            <div className="goals-list-main-wrapper">
                {
                    Object.entries(data)?.map(([key, value],idx)=>(
                         <div>
                            {`${idx+1}). ${key} : ${value}`}
                         </div>
                    ))
                }
                <Button text="start" className="goals-start-button"/>
            </div>
            ))
            : <NoDataFoundComponent message="No Goals Found"/>
        }
    </div>
    </div>
}