import { gql } from "@apollo/client";

export const GET_MEETING_LIST = gql`
  query GetMeetingList($data: MeetingListFilterInputType!) {
    getMeetingList(data: $data) {
      meetingList {
        meetingNumber
        password
        link
        isActive
        scheduledAt
        isPaid
        meetingCode
        title
        description
      }
      response {
        status
        message
      }
    }
  }
`;
