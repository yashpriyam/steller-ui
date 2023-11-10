import { gql } from "apollo-server-express";

const typeDefs = gql`

  type Query {
    getUser: String
  }

  type Mutation {
    login: String
  }

  scalar DateTime
  scalar JSON
`;

export default typeDefs;
