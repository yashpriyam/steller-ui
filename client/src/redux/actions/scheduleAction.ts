import { useDispatch, useSelector } from "react-redux";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { actions, selectWeek } from "../slices/week/weekSlice";
import { GET_SCHEDULE_DATA } from "../../graphql/query/week/getScheduleData";
export const useWeek = () => {
    const dispatch = useDispatch();
    const weekData = useSelector(selectWeek);

    const getScheduleData = async ({
        weekNumber,
        title,
        isDisabledForUnpaidUsers,
        isActive,
        description,
        batchCode,
    }: WeekDataType) => {
        try {
            dispatch(actions.setIsScheduleDataLoading(true));
            const response = await apolloClient.query({
                query: GET_SCHEDULE_DATA,
                variables: {
                    videoDataFilter: {
                        weekNumber,
                        title,
                        isDisabledForUnpaidUsers,
                        isActive,
                        description,
                        batchCode,
                    },
                },
            });
            dispatch(actions.setSchedule(response.data.getScheduleData));
            return response;
        } catch (err) {
            console.log(err);
        }
        finally{
            dispatch(actions.setIsScheduleDataLoading(false));
        }

    }

    return { weekData, getScheduleData };
};