import { gql } from "@apollo/client";

export const GET_SCHEDULE_DATA = gql`
  query GetScheduleData($accessWeeks: [Int], $weekDataFilter: WeekDataInputType, $sortData: SortDataInputType) {
  getScheduleData(accessWeeks: $accessWeeks, weekDataFilter: $weekDataFilter, sortData: $sortData){
      weekData {
        batchCode
        weekNumber
        title
        description
        isActive
        isDisabledForUnpaidUsers
        date
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
