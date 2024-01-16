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
    ): UpdateProfilePictureOutput
    createPaidUser(data: PaidUserInputType): PaidUserOutputType
    sendOtpToPaidUser(email: String!): CustomResponseType
    verifyOtpPaidUser(data: VerifyOtpPaidUserInputType!): CustomResponseType
    updatePaidUserPassword(
      data: updatePaidUserPasswordInputType!
    ): CustomResponseType
    verifyUserOtp(data:VerifyOtpPaidUserInputType!):CustomResponseType
    updateUserPassword(data:updatePaidUserPasswordInputType!):CustomResponseType
    upsertWeek( weekData: UpsertWeekDataInputType!) : UpsertWeekDataOutputType
    createDay(dayData: DayDataInputType!) : DayDataOutputType
  }

  type ProfileImageType {
    publicId: String
    secureUrl: String
  }

  type UpdateProfilePictureOutput {
    profileImage: ProfileImageType
    response: CustomResponseType!
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
    userData: RegisterOutputType
    response: CustomResponseType!
    credentials: String
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
    title: [QuestionOptionInputType!]!
    batchCode: String!
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
  }
  enum QuestionType {
    multi
    single
    fillup
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
    title: [QuestionOptionOutputType!]!
    batchCode: String!
    options: [QuestionOptionOutputType!]!
    questionType: QuestionType!
    answer: [QuestionOptionOutputType!]!
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

  enum QuestionMetaType {
    timed
    recorded
  }
  input UpdateQuestionInputType {
    questionId: ID!
    updates: UpdatesQuestionInput
  }

  input UpdatesQuestionInput {
    title: [UpdateOptionInput]
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

  type QuestionOptionOutputType {
    text: String!
    imageUrl: String
    iframe: String
  }

  type QuestionDataOutput {
    title: [QuestionOptionOutputType]
    batchCode: String
    options: [QuestionOptionOutputType]
    questionType: QuestionType
    answer: [QuestionOptionOutputType]
    marks: Int
    meta: QuestionMetaOutput
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

 type AttemptQuestionOptionOutputType  {
   text: String
   imageUrl: String
   iframe: String
   isChecked: Boolean
 }

  type AttemptedQuestionIdDataType  {
    id: String
    title: [QuestionOptionOutputType!]!
    batchCode: String!
    options: [AttemptQuestionOptionOutputType!]!
    questionType: QuestionType!
    answer: [QuestionOptionOutputType!]!
    marks: Int!
    meta: QuestionMetaOutput!
  }

  type AttemptedQuestionDataType {
    userId: ID
    questionId: AttemptedQuestionIdDataType!
    response: [QuestionOptionOutputType]
    isCorrect: Boolean
    timestamp: DateTime
  }

  type GetAllQuestionsOutputType {
    attemptedQuestions: [AttemptedQuestionDataType]
    nonAttemptedQuestions: [QuestionDataType]
    totalAttemptedQuestions: Int
    totalNonAttemptedQuestions: Int
    totalQuestions: Int
    response: CustomResponseType
  }
  input QuestionAttemptType {
    userId: String!
    questionId: String!
    response: [QuestionOptionInputType]!
    isCorrect: Boolean
  }
  type QuestionAttemptOutputType {
    questionData: QuestionAttemptDataType
    response: CustomResponseType!
  }
  type QuestionAttemptDataType {
    userId: ID
    questionId: ID
    response: [QuestionOptionOutputType]
    isCorrect: Boolean
    timestamp: DateTime
  }

  input LoginUserDataInputType {
    email: String!
    password: String!
  }
  type LoginUserDataOutputType {
    response: CustomResponseType!
    credentials: String
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
    days: [DaySchemaType]
  }
  type WeekDataOutputType {
    weekData: [WeekDataType]
    response: CustomResponseType!
  }  
  input UpsertWeekDataInputType {
    batchCode: String!
    description: String
    title: String
    isActive: Boolean
    isDisabledForUnpaidUsers: Boolean
    weekNumber: Int!
  }
  type UpsertWeekDataOutputType {
    weekData: WeekDataType
    response: CustomResponseType!
  } 
  input DayDataInputType {
    batchCode: String!
    dayNumber: Int!
    weekNumber: Int!
    title: String
    description: String
    topics: [String]
  }
  type DaySchemaType {
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
    dayData: DaySchemaType
    response: CustomResponseType!
  }
  scalar DateTime
  scalar JSON
`;

export default typeDefs;
