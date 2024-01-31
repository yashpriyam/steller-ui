import { useNavigate, useParams } from 'react-router-dom';
import { useMeeting } from '../../redux/actions/meetingAction';
import { useUser } from '../../redux/actions/userAction';
import { startZoomMeet } from '../../utils';
import React, { useEffect } from 'react'

export const MeetingPage = () => {
    const navigate = useNavigate();
    const { meetingCode } = useParams();
    const { getMeeting } = useMeeting();
    const { user } = useUser();
    const { userData } = user;

    const getMeetingDetails = async (meetCode: string) => {
        const { status, response } = await getMeeting(meetCode);
        const meetingData = response?.data?.getMeeting?.meetingData;
        if (status === 400 && !meetingData) {
            navigate('/dashboard')
        } else {
            if (meetingData) {
                startZoomMeet({
                    leaveUrl: window.location.hostname,
                    meetingNumber: meetingData.meetingNumber,
                    password: meetingData.password,
                    userName: userData?.name,
                    sdkKey: process.env.REACT_APP_ZOOM_SDK_KEY || "",
                    sdkSecret: process.env.REACT_APP_ZOOM_SDK_SECRET || ""
                })
            }
        }
    }

    useEffect(() => {
        userData && meetingCode && getMeetingDetails(meetingCode)
    }, [userData])
    return (
        <></>
    )
}
