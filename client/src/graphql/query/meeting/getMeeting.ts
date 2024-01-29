import { gql } from "@apollo/client";

export const GET_MEETING = gql`
  query GetMeeting($meetingFilter: GetMeetingFilterInputType!) {
    getMeeting(meetingFilter: $meetingFilter) {
      meetingData {
        meetingNumber
        password
        meetingCode
        title
        link
        isActive
        scheduledAt
        isPaid
        description
      }
      response {
        status
        message
      }
    }
  }
`;
