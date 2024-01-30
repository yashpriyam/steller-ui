import { useDispatch, useSelector } from "react-redux"
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { GET_MEETING } from "../../graphql/query/meeting/getMeeting";
import { meetingActions, selectMeeting } from "../slices/meeting/meetingSlice";
import { GET_MEETING_LIST } from "../../graphql/query/meeting/getMeetingList";

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
            return {
                response,
                status: response?.data?.getMeeting?.response?.status
            }
        }catch(err){
            return {}
        }
    }
    const getMeetingList = async(meetingListFilter: GetMeetingListArgsType) => {
        try{
            const response = await apolloClient.query({
                query: GET_MEETING_LIST,
                variables: {
                    data: meetingListFilter
                }
            });
            dispatch(meetingActions.setMeetingList(response))
            return {
                response,
                status: response?.data?.getMeeting?.response?.status
            }
        }catch(err){
            return {}
        }
    }
    return { getMeeting, getMeetingList, meetingDetails, }
}