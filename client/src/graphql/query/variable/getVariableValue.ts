import { gql } from "@apollo/client";
export const GET_VARIABLE_VALUE = gql`
  query GetVariableValue($key: String!) {
    getVariableValue(key: $key) {
      value
      response {
        status
        message
      }
    }
  }
`;
