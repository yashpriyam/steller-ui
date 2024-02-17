import { apolloClient } from "../graphql/apolloClient/apolloClient";
import { GET_VARIABLE_VALUE } from "../graphql/query/variable/getVariableValue";

export const getVariableValue = async (key: string) => {
  try {
    const response = await apolloClient.query({
      query: GET_VARIABLE_VALUE,
      variables: {
        key: key,
      },
    });
    return response.data?.getVariableValue;
  } catch (error) {
    console.log(error);
  }
};
