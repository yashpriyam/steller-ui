import { gql } from "@apollo/client";

export const GET_BATCH_CODE = gql`
  query GetBatchCode {
    getBatchCode {
      batchData {
        batchCode
        startDate
      }
      response {
        status
        message
      }
    }
  }
`;
