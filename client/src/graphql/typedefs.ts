import { gql } from "@apollo/client";

const typeDefs = gql`
  type Query {
    getAllVideos(videoDataFilter: VideoInputFilterType): AllVideoOutputDataType
    getAllQuestions(
      filterData: FilterData
      pagination: Pagination
    ): GetAllQuestionsOutputType
  }

  type Mutation {
    registerUser(data: RegistrationInputType!): RegistrationOutputDataType
    login(data: LoginUserDataInputType!): LoginUserDataOutputType!
    sendOtpToPaidUser(email: String!): CustomResponseType
    verifyOtpPaidUser(data: VerifyOtpPaidUserInputType!): CustomResponseType
    updatePaidUserPassword(
      data: updatePaidUserPasswordInputType!
    ): CustomResponseType
    createQuestionAttemptByUser(
      questionAttemptData: QuestionAttemptType!
    ): QuestionAttemptOutputType

    updateUser(input: PartialUserSchemaType!): UserDataOutputType
  }

  type CustomResponseType {
    status: Int!
    message: String!
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

  input VideoInputFilterType {
    title: String
    description: String
    dayNumber: Int
    videoNumber: Int
    topics: [String]
    links: OptionalLinksInput
    isActive: Boolean
    duration: String
  }

  input OptionalLinksInput {
    webmasters: String
    youtube: String
  }

  type AllVideoOutputDataType {
    videoData: [videoDataType]
    response: CustomResponseType!
  }
  type videoDataType {
    title: String
    description: String
    dayNumber: Int
    videoNumber: Int
    topics: [String]
    links: Links
    isActive: Boolean
    duration: String
    createdAt: String
    updatedAt: String
  }

  type Links {
    webmasters: String
    youtube: String
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
    password: String!
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

  input FilterData {
    topic: String
    isActive: Boolean
    isArchived: Boolean
    week: Int
    day: Int
    batchCode: String
  }
  input Pagination {
    skip: Int
    limit: Int
  }
  input QuestionOptionInputType {
    text: String!
    imageUrl: String
    iframe: String
  }
  input QuestionAttemptType {
    questionId: String!
    response: [QuestionOptionInputType]!
  }

  type QuestionAttemptOutputType {
    questionData: QuestionAttemptDataType
    response: CustomResponseType!
  }
  type QuestionAttemptDataType {
    userId: ID
    questionId: ID
    response: [QuestionAttemptResponseType]
    isCorrect: Boolean
  }
  type QuestionAttemptResponseType {
    text: String
    imageUrl: String
    iframe: String
    isChecked: Boolean
  }

  input PartialUserSchemaType {
    email: String
    name: String
    phoneNumber: String
    password: String
    isJobSeeker: Boolean
    occupation: String
    sessionPreference: String
    expectedSalary: String
    IST: String
    collegeName: String
    location: String
    courseYear: String
    course: String
    branch: String
    batchCode: String
    feePlan: String 
  }

  type UserSchemaType {
    email: String
    name: String
    phoneNumber: String
    password: String
    isJobSeeker: Boolean
    occupation: String
    sessionPreference: String
    expectedSalary: String
    IST: String
    collegeName: String
    location: String
    courseYear: String
    course: String
    branch: String
    batchCode: String
    feePlan: String 
  }
  
 
  type UserDataOutputType {
    userData: UserSchemaType
    response: CustomResponseType
  }


  scalar DateTime
  scalar JSON
`;

export default typeDefs;
