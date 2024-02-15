import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMeeting } from "../../redux/actions/meetingAction";
import { useUser } from "../../redux/actions/userAction";
import { startZoomMeet } from "../../utils";
import React, { useEffect } from "react";
import Spinner from "../../components/spinner/spinner"

export const MeetingPage = () => {
  const navigate = useNavigate();
  const { meetingCode } = useParams();
  const { state } = useLocation();
  const { meetingData } = state || {};
  const { getMeeting } = useMeeting();
  const { user } = useUser();
  const { userData } = user;

  const dashboardUrl = `${window.location.origin}/dashboard`;

  const getMeetingConfig = (meetingData: MeetingDataType): ZoomConfigType => ({
    leaveUrl: dashboardUrl,
    meetingNumber: meetingData.meetingNumber,
    password: meetingData.password,
    userName: userData?.name,
    sdkKey: process.env.REACT_APP_ZOOM_SDK_KEY || "",
    sdkSecret: process.env.REACT_APP_ZOOM_SDK_SECRET || "",
  });

  const getMeetingDetails = async (meetCode: string) => {
    const { status, response } = await getMeeting(meetCode);
    const meetingDetails = response?.data?.getMeeting?.meetingData;
    if (status === 400 && !meetingDetails) {
      navigate("/dashboard");
    } else {
      startZoomMeet(getMeetingConfig(meetingDetails));
    }
  };
  useEffect(() => {
    if (meetingData) {
      startZoomMeet(getMeetingConfig(meetingData));
    } else if (userData && meetingCode) {
      getMeetingDetails(meetingCode);
    }
  }, [userData]);
  return <Spinner />
};
