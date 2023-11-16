import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    getUser: String
  }

  type Mutation {
    login: String
    registerUser(data: RegistrationInputType!): RegistrationInputDataType
  }

  input RegistrationInputType {
    name: String!
    email: String!
    phoneNumber: String!
    isJobSeeker: Boolean!
    occupation: String!
    sessionPreference: SessionPreferenceEnum!
    expectedSalary: String!
  }

  enum SessionPreferenceEnum {
    online
    offline
  }

  type RegistrationInputDataType {
    name: String!
    email: String!
    phoneNumber: String!
    isJobSeeker: Boolean!
    occupation: String!
    sessionPreference: SessionPreferenceEnum!
    expectedSalary: String!
  }

  scalar DateTime
  scalar JSON
`;

export default typeDefs;
