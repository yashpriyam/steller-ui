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
          date
          questions {
            marks
          }
          videos {
            title
          }
          notes {
            title
            dayNumber
          }
        }
      }
      response {
        status
        message
      }
    }
  }
`;
