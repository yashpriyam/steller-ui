import { useDispatch, useSelector } from "react-redux"
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { GET_MEETING } from "../../graphql/query/meeting/getMeeting";
import { meetingActions, selectMeeting } from "../slices/meeting/meetingSlice";

export const useMeeting = () => {
    const meetingDetails = useSelector(selectMeeting);
    const dispatch = useDispatch();

    const getMeeting = async(meetingCode: string) => {
        try{
            const response = await apolloClient.query({
                query: GET_MEETING,
                variables: {
                    meetingFilter: {
                        meetingCode
                    }
                }
            })
            dispatch(meetingActions.setMasterMeet(response))
            return {
                response,
                status: response?.data?.getMeeting?.response?.status
            }
        }catch(err){
            return {}
        }
    }
    const getMasterMeeting = () => getMeeting('master');
    return { getMeeting, getMasterMeeting, meetingDetails,  }
}