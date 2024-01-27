import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_SERVER_BASE_URL,
    credentials: 'include',
})

const cookie = localStorage.getItem(process.env.REACT_APP_JWT_SECRET_KEY || "")

const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        cookie,
      },
    };
  });

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})