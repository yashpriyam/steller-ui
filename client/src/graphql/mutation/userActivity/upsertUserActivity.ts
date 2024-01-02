import { gql } from "@apollo/client";

export const UPSERT_USER_ACTIVITY = gql`
  mutation UpsertUserActivity($userActivityData: UserActivityInputType) {
    upsertUserActivity(userActivityData: $userActivityData) {
      response {
        status
        message
      }
    }
  }
`;
