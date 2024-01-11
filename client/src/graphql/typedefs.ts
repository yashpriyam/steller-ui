import { gql } from "@apollo/client";

const typeDefs = gql`
  type Query {

  }

  type Mutation {
    registerUser(data: RegistrationInputType!): RegistrationOutputDataType
    login(data: LoginUserDataInputType!): LoginUserDataOutputType!
    sendOtpToPaidUser(email: String!): CustomResponseType
    verifyOtpPaidUser(data: VerifyOtpPaidUserInputType!): CustomResponseType
    updatePaidUserPassword(
      data: updatePaidUserPasswordInputType!
    ): CustomResponseType
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
    input updatePaidUserPasswordInputType {
    email: String!
    password:String!
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