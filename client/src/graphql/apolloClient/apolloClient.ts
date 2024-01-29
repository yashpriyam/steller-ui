import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_BASE_URL,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${process.env.REACT_APP_JWT_SECRET_KEY}=`))
    ?.split('=')[1];

  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});