import { gql } from "apollo-server-express";

const typeDefs = gql`
  input RegistrationInputType {
    name: String
    email: String
    phoneNumber: String
    isJobSeeker: Boolean
    occupation: String
    sessionPreference: String
    expectedSalary: String
  }

  type RegistrationInputDataType {
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
    registerUser(data: RegistrationInputType): RegistrationInputDataType
  }

  scalar DateTime
  scalar JSON
`;

export default typeDefs;
