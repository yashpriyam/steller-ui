import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    getPaymentDetails(programType: ProgramTypeEnum!): ProgramDetailsDataType
  }

  type Mutation {
    login: String
    registerUser(data: RegistrationInputType!): RegistrationInputDataType
  }

  enum ProgramTypeEnum {
    demoCourse
    oneWeekProgram
    fullCourse
  }

  type ProgramDetailsDataType {
    name: String
    description: String
    programType: String
    amount: Int
    isActive: Boolean
    title: String
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
