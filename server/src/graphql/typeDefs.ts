import { gql } from "apollo-server-express";

const typeDefs = gql`
  input Registration {
    name: String
    email: String
    phoneNumber: String
    isJobSeeker: Boolean
    occupation: String
    sessionPreference: String
    expectedSalary: String
  }

  type RegisterType {
    name: String
    email: String
    phoneNumber: String
    isJobSeeker: Boolean
    occupation: String
    sessionPreference: String
    expectedSalary: String
  }

  type Query {
    getUser: String
  }

  type Mutation {
    login: String
    registerUser(data: Registration): RegisterType
  }

  scalar DateTime
  scalar JSON
`;

export default typeDefs;
