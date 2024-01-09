import { gql } from "@apollo/client";

const typeDefs = gql`
  type Query {

  }

  type Mutation {
    registerUser(data: RegistrationInputType!): RegistrationOutputDataType
    login(data: LoginUserDataInputType!): LoginUserDataOutputType!
    sendOtpToPaidUser(email: String!): CustomResponseType
    verifyOtpPaidUser(data: VerifyOtpPaidUserInputType!): CustomResponseType
    updatePaidUser(data: updatePaidUserInputType!): PaidUserOutputType
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
  input LoginUserDataInputType {
    email: String!
    password: String!
  }
  type LoginUserDataOutputType {
    response: CustomResponseType!
  }
   type CustomResponseType {
    status: Int!
    message: String!
  }
  input VerifyOtpPaidUserInputType {
    email: String!
    emailOtp: String!
  }
    input updatePaidUserInputType {
    email: String!
    updatedNewData: UpdatePaidDataType
  }
  input UpdatePaidDataType {
    username: String
    contact: String
    profileImg: PaidProfileImageInput
    batchCode: String
    sessionPreference: SessionPreferenceEnum
    professionalStatus: String
    college: String
    expectedSalary: String
    socialHandles: SocialMediaHandles
    address: String
    password: String
  }
  type PaidUserOutputType {
    paidUserData: PaidUserData
    response: CustomResponseType!
  }
  type PaidUserData {
    username: String!
    email: String!
    contact: String!
    profileImg: PaidProfileImageOutput
    batchCode: String
    sessionPreference: SessionPreferenceEnum
    professionalStatus: String
    college: String
    expectedSalary: String
    socialHandles: SocialMediaHandlesOutput
    address: String
  }
  scalar DateTime
  scalar JSON
`;

export default typeDefs;