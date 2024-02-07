import { gql } from "@apollo/client";

const typeDefs = gql`
  type Query {
    getAllVideos(videoDataFilter: VideoInputFilterType): AllVideoOutputDataType
    getAllQuestions(
      filterData: FilterData
      pagination: Pagination
    ): GetAllQuestionsOutputType
    getUserCode(input: GetUserCodeInputType): GetUserCodeOutputDataType
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
    saveUserCode(input: SaveUserCodeInput): UserCodeType
    updateUser(input: PartialUserSchemaType!): UserDataOutputType
    createQuestion(questionData: CreateQuestionInputType!): QuestionOutputType
  }

  type GetUserCodeOutputDataType {
    userId: ID!
    questionId: ID!
    weekNumber: Int
    dayNumber: Int
    code: CodeType
    updatedAt: String
  }

  input GetUserCodeInputType {
    dayNumber: Int
    weekNumber: Int
  }

  type UserCodeType {
    userId: ID!
    questionId: ID!
    weekNumber: Int
    dayNumber: Int
    code: CodeType
    updatedAt: String
    response: CustomResponseType!
  }

  type CodeType {
    html: String
    css: String
    js: String
  }

  input SaveUserCodeInput {
    questionId: ID!
    weekNumber: Int
    dayNumber: Int
    code: CodeTypeInput
  }

  input CodeTypeInput {
    html: String
    css: String
    js: String
  }

  type CodeBlockOutputType {
    enableCodeBlock: Boolean
    configuration: ConfigurationOutputType
  }
  type ConfigurationOutputType {
    showOutputWindow: Boolean
    showSplitWindow: Boolean
    openWindows: [CodeEditorWindowOutputType]
  }
  type CodeEditorWindowOutputType {
    title: String
    isEditable: Boolean
    enableUserSelection: Boolean
    predefinedCode: String
  }

  type AttemptQuestionOptionOutputType {
    text: String
    imageUrl: String
    iframe: String
    codeBlock: CodeBlockOutputType
    isChecked: Boolean
  }

  type AttemptedQuestionDataType {
    _id: String
    isAnswered: Boolean
    isCorrect: Boolean
    title: [QuestionOptionOutputType]
    questionType: QuestionType
    options: [AttemptQuestionOptionOutputType]
    answer: [AttemptQuestionOptionOutputType]
    marks: Int
    meta: QuestionMetaOutput
  }

  type GetAllQuestionsOutputType {
    questions: [AttemptedQuestionDataType]
    totalCorrectQuestions: Int
    totalUnAttemptedQuestions: Int
    totalInCorrectQuestions: Int
    totalQuestions: Int
    response: CustomResponseType
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

  input CreateQuestionInputType {
    title: [QuestionOptionInputType!]!
    options: [QuestionOptionInputType!]!
    questionType: QuestionType!
    answer: [QuestionOptionInputType!]!
    marks: Int!
    meta: QuestionMeta!
  }
  input QuestionOptionInputType {
    text: String!
    imageUrl: String
    iframe: String
    codeBlock: CodeBlockInputType
  }
  input CodeBlockInputType {
    enableCodeBlock: Boolean
    configuration: ConfigurationType
  }
  input ConfigurationType {
    showOutputWindow: Boolean
    showSplitWindow: Boolean
    openWindows: [CodeEditorWindowType]
  }
  input CodeEditorWindowType {
    title: String
    isEditable: Boolean
    enableUserSelection: Boolean
    predefinedCode: String
  }

  enum CodeEditorWindowTypeEnum {
    HTML
    CSS
    JS
  }

  enum QuestionType {
    multi
    single
    fillup
    codeblock
  }
  input QuestionMeta {
    topic: String!
    batchCode: String!
    week: Int!
    day: Int!
    isActive: Boolean!
    isArchived: Boolean!
    type: QuestionMetaType!
    expiresInMins: Int!
    isOpenable: Boolean!
  }
  type QuestionOutputType {
    questionData: QuestionDataType
    response: CustomResponseType
  }
  type QuestionDataType {
    id: String
    title: [QuestionOptionOutputType!]!
    options: [QuestionOptionOutputType!]!
    questionType: QuestionType!
    answer: [QuestionOptionOutputType!]!
    marks: Int!
    meta: QuestionMetaOutput!
  }
  type QuestionMetaOutput {
    topic: String!
    day: Int!
    week: Int!
    batchCode: String!
    isActive: Boolean!
    isArchived: Boolean!
    type: QuestionMetaType!
    expiresInMins: Int!
    isOpenable: Boolean!
  }
  type QuestionOptionOutputType {
    text: String!
    imageUrl: String
    iframe: String
    codeBlock: CodeBlockOutputType
  }
  type CodeBlockOutputType {
    enableCodeBlock: Boolean
    configuration: ConfigurationOutputType
  }
  type ConfigurationOutputType {
    showOutputWindow: Boolean
    showSplitWindow: Boolean
    openWindows: [CodeEditorWindowOutputType]
  }
  type CodeEditorWindowOutputType {
    title: String
    isEditable: Boolean
    enableUserSelection: Boolean
    predefinedCode: String
  }
  enum QuestionMetaType {
    timed
    recorded
  }

  scalar DateTime
  scalar JSON
`;

export default typeDefs;
