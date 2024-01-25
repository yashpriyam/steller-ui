import { gql } from "@apollo/client";

export const GET_FEE_PLAN_DETAILS = gql`
mutation GetFeePlanDetailsByBatchCode($batchCode: String!) {
    getFeePlanDetailsByBatchCode(batchCode: $batchCode) {
      feePlanData {
        _id
        batchCode
        name
        description
        installments {
          _id
          amount
          sequence
          dueDate
        }
       
      }
      response {
        message
        status
      }
    }
  }
  
`;
