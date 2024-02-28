const axios = require('axios');

// Function to execute GraphQL query
export const executeGraphQLQuery = async (query: string, variables: Record<string, any>) => {
  try {
    const response = await axios.post('https://leetcode.com/graphql', {
      query,
      variables,
    }, {
      headers: {
        'Content-Type': 'application/json',
        // Add any necessary authorization headers or other headers here
      },
    });

    // Extract data and errors from the response
    const { data =  [], errors } = response.data;
    // Handle errors, if any
    if (errors) {
      console.log({errors})
    }

    // Return the data
    return data;
  } catch (error) {
    console.error('Error executing GraphQL query:', error);
    return [];
  }
};