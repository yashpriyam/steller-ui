import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_BASE_URL,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  
  return {
    headers: {
      ...headers,
      'Set-Cookie': document.cookie
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
