import { useDispatch, useSelector } from "react-redux";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { userGoalsActions, selectUserGoals } from "../slices/userGoals/userGoalsSlice";
import { GET_All_USER_GOALS } from "../../graphql/query/userGoals/userGoals";

export const useUserGoals = () => {
    const dispatch = useDispatch();
    const userGoals = useSelector(selectUserGoals);
    const getUserGoals= async () => {
        try {
            dispatch(userGoalsActions.setIsGoalsDataLoading(true))
            const response = await apolloClient.query({
                query: GET_All_USER_GOALS,
                variables: {},
            });
        dispatch(userGoalsActions.setUserGoalsData(response.data.getAllUserGoals));
        return response;
    } catch (err) {
        console.error(err);
    } finally{
        dispatch(userGoalsActions.setIsGoalsDataLoading(false))
    }
    }
    return { userGoals, getUserGoals };
}