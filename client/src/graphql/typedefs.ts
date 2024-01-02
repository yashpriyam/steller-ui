import { gql } from "@apollo/client";

const typeDefs = gql`
  type Query {

  }

  type Mutation {
    registerUser(data: RegistrationInputType!): RegistrationOutputDataType
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

  type RegistrationOutputDataType {
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