import { gql } from "@apollo/client";

export const GET_SCHEDULE_DATA = gql`
  query GetScheduleData($weekDataFilter: WeekDataInputType) {
    getScheduleData(weekDataFilter: $weekDataFilter) {
      weekData {
        batchCode
        weekNumber
        title
        description
        isActive
        isDisabledForUnpaidUsers
        days {
          batchCode
          dayNumber
          weekNumber
          title
          description
          topics
        }
      }
      response {
        status
        message
      }
    }
  }
`;
