import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    allItems: String
  }

  type Mutation {
    login: String
  }
`;

export default typeDefs;
