import { useDispatch, useSelector } from "react-redux";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { GET_All_GOALS } from "../../graphql/query/goals/getAllGoals";
import { goalsActions, selectGoals } from "../slices/goals/goalsSlice";

export const useGoals = () => {
    const dispatch = useDispatch();
    const goals = useSelector(selectGoals);
    const getGoals= async () => {
        try {
            dispatch(goalsActions.setIsGoalsDataLoading(true))
            const response = await apolloClient.query({
                query: GET_All_GOALS,
                variables: {},
            });
        dispatch(goalsActions.setGoalsData(response.data.getAllGoals));
        return response;
    } catch (err) {
        console.error(err);
    } finally{
        dispatch(goalsActions.setIsGoalsDataLoading(false))
    }
    }
    return { goals, getGoals };
}