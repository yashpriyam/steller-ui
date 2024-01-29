import { useMeeting } from '../../redux/actions/meetingAction';
import { useUser } from '../../redux/actions/userAction';
import { startZoomMeet } from '../../utils';
import React, { useEffect } from 'react'

export const MeetingPage = () => {
    const { meetingDetails, getMasterMeeting } = useMeeting();
    const { masterMeeting } = meetingDetails;
    const { user } = useUser();
    const { userData } = user;
    useEffect(() => {
        masterMeeting && userData && startZoomMeet({
            leaveUrl: window.location.hostname,
            meetingNumber: masterMeeting.meetingNumber,
            password: masterMeeting.password,
            userName: userData?.name,
            sdkKey: process.env.REACT_APP_ZOOM_SDK_KEY || "",
            sdkSecret: process.env.REACT_APP_ZOOM_SDK_SECRET || ""
        })
    }, [userData, masterMeeting]);

    useEffect(() => {
        getMasterMeeting()
    }, [])
    return (
        <></>
    )
}
