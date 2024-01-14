import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    getPaymentDetails(programType: String!): ProgramDetailsOutputDataType
    getAllNotes(filterData: GetNotesFilterInputType): getAllNotesOutputType
    getNotes(filterData: GetNotesFilterInputType): getNotesOutputType
    getVideo(videoDataFilter: VideoInputFilterType): VideoOutputDataType
    getAllQuestions(
      filterData: GetQuestionsFilterInput
    ): GetAllQuestionsOutputType
    getAllVideos(videoDataFilter: VideoInputFilterType): AllVideoOutputDataType
    getScheduleData(weekDataFilter: WeekDataInputType): WeekDataOutputType
  }

  type Mutation {
    login(data: LoginUserDataInputType!): LoginUserDataOutputType!
    registerUser(data: RegistrationInputType!): RegistrationOutputDataType
    createTransaction(
      data: CreateTransactionInputType!
    ): CreateTransactionOutputType
    createNotes(notesData: CreateNotesInputType!): CreateNotesOutputType
    createVideo(videoData: CreateVideoInput!): VideoOutputDataType
    deleteNotesById(notesId: ID!): DeletedNotesOutputType
    deleteVideoById(videoId: ID!): VideoOutputDataType
    updateVideoById(
      videoId: ID!
      videoData: VideoInputFilterType!
    ): VideoOutputDataType
    updateNotesById(
      notesId: ID!
      notesData: UpdateNotesInputType
    ): UpdateNotesOutputType
    upsertUserActivity(
      userActivityData: UserActivityInputType
    ): UserActivityOutputType
    createQuestion(questionData: CreateQuestionInputType!): QuestionOutputType
    updateQuestionById(
      updateQuestionData: UpdateQuestionInputType!
    ): UpdateQuestionOutputType
    sendOtp(email: String!): OtpUserOutputType
    sendOtpToRegisteredUser(email: String!): OtpUserOutputType
    createQuestionAttemptByUser(
      questionAttemptData: QuestionAttemptType!
    ): QuestionAttemptOutputType
    updateProfilePicture(
      image: String
      size: Int
      name: String
    ): [UpdateProfilePictureOutput]
    createPaidUser(data: PaidUserInputType): PaidUserOutputType
    sendOtpToPaidUser(email: String!): CustomResponseType
    verifyOtpPaidUser(data: VerifyOtpPaidUserInputType!): CustomResponseType
    updatePaidUserPassword(
      data: updatePaidUserPasswordInputType!
    ): CustomResponseType
    verifyUserOtp(data:VerifyOtpPaidUserInputType!):CustomResponseType
    updateUserPassword(data:updatePaidUserPasswordInputType!):CustomResponseType
    upsertDay(dayData: UpsertDayDataInputType!) : DayDataOutputType
  }
  type UpdateProfilePictureOutput {
    public_id: String
    secure_url: String
  }

  type CustomResponseType {
    status: Int!
    message: String!
  }

  type AllVideoOutputDataType {
    videoData: [videoDataType]
    response: CustomResponseType!
  }

  type VideoOutputDataType {
    videoData: videoDataType
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

  input CreateVideoInput {
    title: String!
    description: String
    dayNumber: Int!
    videoNumber: Int!
    topics: [String]!
    links: LinksInput!
    isActive: Boolean
    duration: String
  }

  input LinksInput {
    webmasters: String
    youtube: String!
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

  input CreateTransactionInputType {
    amount: Int!
    programType: String!
    paymentId: String!
    userId: String!
    isPaymentSuccessfull: Boolean!
  }

  type CreateTransactionOutputType {
    amount: Int!
    programType: String!
    paymentId: String!
    userId: String!
    isPaymentSuccessfull: Boolean!
  }

  type ProgramDetailsOutputDataType {
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
    isJobSeeker: Boolean
    occupation: String
    sessionPreference: SessionPreferenceEnum
    expectedSalary: String
    collegeName: String
  }

  enum SessionPreferenceEnum {
    online
    offline
  }

  type RegistrationOutputDataType {
    userData:RegisterOutputType
    response :CustomResponseType!
  }
  type RegisterOutputType{
    name: String!
    email: String!
    phoneNumber: String!
    isJobSeeker: Boolean
    occupation: String
    sessionPreference: SessionPreferenceEnum
    expectedSalary: String
    collegeName: String
  }
  input CreateNotesInputType {
    link: String!
    title: String!
    dayNumber: Int!
    topics: [String]!
    noOfPages: Int
    description: String
    estimatedReadingTime: String
  }

  input OtpUserInputType {
    email: String!
  }
  type OtpUserOutputType {
    response: CustomResponseType!
  }
  input UserActivityInputType {
    phoneNumber: String
    isOpened: Boolean
    devices: [String]
    IST: String
    isValidPhoneNumber: Boolean
  }
  type UserActivityOutputType {
    response: CustomResponseType!
  }

  type CreateNotesOutputType {
    notesData: NotesDataType
    response: CustomResponseType!
  }
  input UpdateNotesInputType {
    link: String
    title: String
    dayNumber: Int
    topics: [String]
    noOfPages: Int
    description: String
    estimatedReadingTime: String
  }
  type UpdateNotesOutputType {
    notesData: UpdateNotesDataType
    response: CustomResponseType!
  }
  type UpdateNotesDataType {
    link: String!
    title: String!
    dayNumber: Int!
    topics: [String]!
    noOfPages: Int
    description: String
    estimatedReadingTime: String
  }
  type DeletedNotesOutputType {
    notesData: DeletedNotesDataType
    response: CustomResponseType
  }
  type DeletedNotesDataType {
    link: String
    title: String
    dayNumber: Int
    topics: [String]
    noOfPages: Int
    description: String
    estimatedReadingTime: String
  }
  input GetNotesFilterInputType {
    link: String
    title: String
    dayNumber: Int
    topics: [String]
    noOfPages: Int
    description: String
    estimatedReadingTime: String
  }
  type getAllNotesOutputType {
    notesData: [NotesDataType]
    response: CustomResponseType!
  }
  type getNotesOutputType {
    notesData: NotesDataType
    response: CustomResponseType!
  }
  type NotesDataType {
    link: String
    title: String
    dayNumber: Int
    topics: [String]
    noOfPages: Int
    description: String
    estimatedReadingTime: String
  }
  input CreateQuestionInputType {
    question: [Option!]!
    batchCode: String!
    options: [Option!]!
    questionType: QuestionType!
    answer: [Option!]!
    marks: Int!
    meta: QuestionMeta!
  }
  input Option {
    imageUrl: String
    text: String!
  }
  enum QuestionType {
    multi
    single
  }
  input QuestionMeta {
    topic: String!
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
    question: [OptionOutput!]!
    batchCode: String!
    options: [OptionOutput!]!
    questionType: QuestionType!
    answer: [OptionOutput!]!
    marks: Int!
    meta: QuestionMetaOutput!
  }
  type QuestionMetaOutput {
    topic: String!
    day: Int!
    isActive: Boolean!
    isArchived: Boolean!
    type: QuestionMetaType!
    expiresInMins: Int!
    isOpenable: Boolean!
  }
  type OptionOutput {
    imageUrl: String
    text: String!
  }
  enum QuestionMetaType {
    timed
    recorded
  }
  input UpdateQuestionInputType {
    questionId: ID!
    updates: UpdatesQuestionInput
  }

  input UpdatesQuestionInput {
    question: [UpdateOptionInput]
    batchCode: String
    options: [UpdateOptionInput]
    questionType: QuestionType
    answer: [UpdateOptionInput]
    marks: Int
    meta: QuestionMetaInput
  }
  input UpdateOptionInput {
    imageUrl: String
    text: String
  }
  input QuestionMetaInput {
    topic: String
    day: Int
    isActive: Boolean
    isArchived: Boolean
    type: QuestionMetaType
    expiresInMins: Int
    isOpenable: Boolean
  }
  type UpdateQuestionOutputType {
    questionData: QuestionDataOutput
    response: CustomResponseType!
  }
  type QuestionDataOutput {
    question: [UpdateOptionOutput]
    batchCode: String
    options: [UpdateOptionOutput]
    questionType: QuestionType
    answer: [UpdateOptionOutput]
    marks: Int
    meta: QuestionMetaOutput
  }
  type UpdateOptionOutput {
    imageUrl: String
    text: String
  }
  type QuestionMetaOutput {
    topic: String
    day: Int
    isActive: Boolean
    isArchived: Boolean
    type: QuestionMetaType
    expiresInMins: Int
    isOpenable: Boolean
  }
  input GetQuestionsFilterInput {
    topic: String
    isActive: Boolean
    isArchived: Boolean
    type: QuestionMetaType
  }
  type GetAllQuestionsOutputType {
    questionData: [QuestionDataType]
    response: CustomResponseType
  }
  input QuestionAttemptType {
    userId: String!
    questionId: String!
    response: [Option]!
    isCorrect: Boolean
  }
  type QuestionAttemptOutputType {
    questionData: QuestionAttemptDataType
    response: CustomResponseType!
  }
  type QuestionAttemptDataType {
    userId: ID
    questionId: ID
    response: [UpdateOptionOutput]
    isCorrect: Boolean
    timestamp: DateTime
  }

  input LoginUserDataInputType {
    email: String!
    password: String!
  }
  type LoginUserDataOutputType {
    response: CustomResponseType!
  }
  input PaidProfileImageInput {
    publicId: String
    secureUrl: String
  }
  input SocialMediaHandles {
    linkedIn: String
    github: String
    medium: String
    portfolio: String
  }
  input PaidUserInputType {
    username: String!
    email: String!
    contact: String!
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
  type PaidProfileImageOutput {
    publicId: String
    secureUrl: String
  }
  type SocialMediaHandlesOutput {
    linkedIn: String
    github: String
    medium: String
    portfolio: String
  }
  input VerifyOtpPaidUserInputType {
    email: String!
    emailOtp: String!
  }
  input updatePaidUserPasswordInputType {
    email: String!
    password: String
  }
  input WeekDataInputType {
    batchCode: String
    weekNumber: Int
    title: String
    description: String
    isActive: Boolean
    isDisabledForUnpaidUsers: Boolean
  } 
  type WeekDataType {
    batchCode: String
    weekNumber: Int
    title: String
    description: String
    isActive: Boolean
    isDisabledForUnpaidUsers: Boolean
    days: [DayDataType]
  }
  type WeekDataOutputType {
    weekData: [WeekDataType]
    response: CustomResponseType!
  }  
  input UpsertDayDataInputType {
    batchCode: String!
    dayNumber: Int!
    weekNumber: Int!
    title: String
    description: String
    topics: [String]
  }
  type DayDataType {
    batchCode: String
    dayNumber: Int
    weekNumber: Int
    title: String
    description: String
    topics: [String]
    notes: [NotesDataType]
    videos: [videoDataType]
    questions: [QuestionDataType]
  }
  type DayDataOutputType {
    dayData: DayDataType
    response: CustomResponseType!
  }
  scalar DateTime
  scalar JSON
`;

export default typeDefs;
