import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    getPaymentDetails(programType: String!): ProgramDetailsOutputDataType
    getAllNotes(filterData: GetNotesFilterInputType): getAllNotesOutputType
    getNotes(filterData: GetNotesFilterInputType): getNotesOutputType
    getVideo(videoDataFilter: VideoInputFilterType): VideoOutputDataType
    getAllQuestions(
      filterData: FilterData
      pagination: Pagination
    ): GetAllQuestionsOutputType
    getAllVideos(videoDataFilter: VideoInputFilterType): AllVideoOutputDataType
    getScheduleData(weekDataFilter: WeekDataInputType): WeekDataOutputType
    getAllCities: CitiesOutputType
    getMeetingList(data: MeetingListFilterInputType!): MeetingListOutputType
    getUser: UserDataOutputType!
    getMeeting(meetingFilter: GetMeetingFilterInputType!): MeetingDataOutputType
    getUserCode(input: getUserCodeInputType): GetUserCodeOutput
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
    verifyUserOtp(data: VerifyOtpPaidUserInputType!): UserOtpOutputType
    updateUserPassword(
      data: updatePaidUserPasswordInputType!
    ): CustomResponseType
    upsertWeek(weekData: UpsertWeekDataInputType!): UpsertWeekDataOutputType
    createDay(dayData: DayDataInputType!): DayDataOutputType
    updateDay(dayData: DayDataInputType!): DayDataOutputType
    updateCoverImage(data: CoverImageInputType): UpdateImageOutputType
    upsertUserProfile(
      data: UpsertUserProfileInputType!
    ): UpsertUserProfileOutputType
    createFeePlan(feePlanData: FeePlanInput!): FeePlanDataOutputType!
    createBatch(input: BatchInput!): BatchDataOutputType!
    updateBatch(batchCode: String!, input: BatchInput!): BatchDataOutputType!
    updateFeePlan(
      feePlanId: String!
      input: FeePlanInput!
    ): FeePlanDataOutputType!
    createUserPayment(input: UserPaymentCreateInput): UserPaymentDataOutput!
    getUserPaymentsByUserId(userId: ID!): UserAllPaymentDataOutputType
    getFeePlanDetailsByBatchCode(
      batchCode: String!
    ): UserAllFeePlanDataOutputType
    createMeeting(data: MeetingDataInputType!): MeetingDataOutputType
    updateMeeting(
      filter: UpdateMeetingInputFilter
      data: UpdateMeetingInputDataType
    ): MeetingDataOutputType
    insertCities(citiesData: [String]!): CitiesOutputType
    updateUser(input: PartialUserSchemaType): UserDataOutputType
    saveUserCode(input: SaveUserCodeInput): UserCodeType
  }

  input SaveUserCodeInput {
    questionId: ID!
    weekNumber: Int
    dayNumber: Int
    code: CodeTypeInput
  }

  type GetUserCodeOutputDataType {
    userId: ID!
    questionId: ID!
    weekNumber: Int
    dayNumber: Int
    code: CodeType
  }

  type GetUserCodeOutput {
    data: [GetUserCodeOutputDataType]
    response: CustomResponseType!
  }

  input CodeTypeInput {
    html: String
    css: String
    js: String
  }

  type CodeType {
    html: String
    css: String
    js: String
  }

  input getUserCodeInputType {
    userId: ID!
    questionId: ID!
    weekNumber: Int
    dayNumber: Int
  }

  type UserCodeType {
    questionId: ID!
    weekNumber: Int
    dayNumber: Int
    code: CodeType
    response: CustomResponseType!
  }

  type ProfileImageType {
    publicId: String
    secureUrl: String
  }

  type UpdateProfilePictureOutput {
    profileImage: ProfileImageType
    response: CustomResponseType!
  }

  type UserOtpOutputType {
    response: CustomResponseType
    credentials: String
  }

  type CustomResponseType {
    status: Int
    message: String
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
    batchCode: String
    weekNumber: String
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
    weekNumber: Int!
    batchCode: String!
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
    batchCode: String!
    name: String!
    email: String!
    phoneNumber: String!
    isJobSeeker: Boolean
    occupation: String
    sessionPreference: SessionPreferenceEnum
    expectedSalary: String
    collegeName: String
    courseYear: String
    course: String
    branch: String
    location: String
    profileImage: String
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
  type RegisterOutputType {
    batchCode: String
    name: String!
    email: String!
    phoneNumber: String!
    isJobSeeker: Boolean
    occupation: String
    sessionPreference: SessionPreferenceEnum
    expectedSalary: String
    collegeName: String
    courseYear: String
    course: String
    branch: String
    location: String
    profileImage: ProfileImageType
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
  type CodeBlockOutputType {
    enableCodeBlock: Boolean
    configuration: ConfigurationOutputType
  }
  input ConfigurationType {
    showOutputWindow: Boolean
    showSplitWindow: Boolean
    openWindows: [CodeEditorWindowType]
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
    batchCode: String
    week: Int
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
    codeBlock: CodeBlockOutputType
  }

  type QuestionDataOutput {
    title: [QuestionOptionOutputType]
    options: [QuestionOptionOutputType]
    questionType: QuestionType
    answer: [QuestionOptionOutputType]
    marks: Int
    meta: QuestionMetaOutput
  }
  type QuestionMetaOutput {
    topic: String
    day: Int
    week: Int
    batchCode: String
    isActive: Boolean
    isArchived: Boolean
    type: QuestionMetaType
    expiresInMins: Int
    isOpenable: Boolean
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

  type AttemptQuestionOptionOutputType {
    text: String
    imageUrl: String
    iframe: String
    codeBlock: CodeBlockOutputType
    isChecked: Boolean
  }

  type AttemptedQuestionIdDataType {
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
  input CoverImageInputType {
    image: String!
  }
  type CoverImageType {
    publicId: String
    secureUrl: String
  }
  type UpdateImageOutputType {
    coverImageData: CoverImageType
    response: CustomResponseType!
  }

  input UserProfileInputType {
    personalDetails: PersonalDetailsInputType
    socialDetail: SocialDetailInputType
    experienceData: [ExperienceDataInputType]
    projectsData: [ProjectsDataInputType]
    skillsData: SkillsDataInputType
    educationalData: [EducationalDataInputType]
    achievementsData: [AchievementsDataInputType]
  }

  input PersonalDetailsInputType {
    fullName: String!
    email: String
    phoneNumber: String
    headline: String
    address: AddressInputType
  }

  input AddressInputType {
    colony: String
    city: String
  }

  input SocialDetailInputType {
    githubLink: String
    linkedInLink: String
  }

  input ExperienceDataInputType {
    companyName: String
    companyLocation: String
    role: String
    startDate: String
    endDate: String
    description: [String]
    techStack: [String]
  }

  input ProjectsDataInputType {
    heading: String
    description: [String]
    deployLink: String
    gitHubLink: String
    techStack: [String]
  }

  input SkillsDataInputType {
    language: [String]
    frontend: [String]
    backend: [String]
    database: [String]
    versionControl: [String]
    cIcD: [String]
  }

  input EducationalDataInputType {
    instituteName: String
    location: String
    course: String
    startDate: String
    endDate: String
    cgpa: String
  }

  input AchievementsDataInputType {
    icon: String
    header: String
    description: String
    links: String
  }
  type UserProfileOutputType {
    personalDetails: PersonalDetailsOutputType
    socialDetail: SocialDetailOutputType
    experienceData: [ExperienceDataOutputType]
    projectsData: [ProjectsDataOutputType]
    skillsData: SkillsDataOutputType
    educationalData: [EducationalDataOutputType]
    achievementsData: [AchievementsDataOutputType]
  }

  type PersonalDetailsOutputType {
    fullName: String!
    email: String
    phoneNumber: String
    headline: String
    address: AddressOutputType
  }

  type AddressOutputType {
    colony: String
    city: String
  }

  type SocialDetailOutputType {
    githubLink: String
    linkedInLink: String
  }

  type ExperienceDataOutputType {
    companyName: String
    companyLocation: String
    role: String
    startDate: String
    endDate: String
    description: [String]
    techStack: [String]
  }

  type ProjectsDataOutputType {
    heading: String
    description: [String]
    deployLink: String
    gitHubLink: String
    techStack: [String]
  }

  type SkillsDataOutputType {
    language: [String]
    frontend: [String]
    backend: [String]
    database: [String]
    versionControl: [String]
    cIcD: [String]
  }

  type EducationalDataOutputType {
    instituteName: String
    location: String
    course: String
    startDate: String
    endDate: String
    cgpa: String
  }

  type AchievementsDataOutputType {
    icon: String
    header: String
    description: String
    links: String
  }
  type UpsertUserProfileOutputType {
    response: CustomResponseType
    userProfile: UserProfileOutputType
  }
  input UpsertUserProfileInputType {
    userProfile: UserProfileInputType
  }
  input FeePlanInput {
    batchCode: String
    name: String!
    description: String
    installments: [InstallmentInput]
    miscellaneous: JSON
  }

  input InstallmentInput {
    id: ID
    amount: String
    sequence: String!
    dueDate: String!
    accessWeeks: ID
    miscellaneous: JSON
  }
  type FeePlanDataOutputType {
    feePlanData: FeePlan
    response: CustomResponseType!
  }
  type InstallmentInputType {
    _id: ID
    amount: String
    sequence: String!
    dueDate: String!
    accessWeeks: ID
    miscellaneous: JSON
  }
  type FeePlan {
    _id: ID!
    batchCode: String
    name: String!
    installments: [InstallmentInputType]
    description: String!
    miscellaneous: JSON
  }

  input BatchInput {
    batchCode: String!
    paymentType: ID
    paidStudents: [ID]
    registeredStudents: [ID]
    demoStudents: [ID]
    startDate: String
  }

  type BatchDataOutputType {
    batchData: Batch
    response: CustomResponseType!
  }

  type Batch {
    _id: ID!
    batchCode: String!
    paymentType: FeePlan
    demoStudents: [User]
    paidStudents: [User]
    registeredStudents: [User]
    startDate: String
  }
  type User {
    _id: ID!
    email: String!
    name: String!
    phoneNumber: String!
    password: String
    isJobSeeker: Boolean!
    occupation: String
    sessionPreference: SessionPreference!
    expectedSalary: String
    IST: String!
    collegeName: String
    profileImage: UserProfile
    coverImage: UserProfile
    userProfile: ID
  }

  type UserProfile {
    url: String!
    altText: String
  }

  enum SessionPreference {
    ONLINE
    OFFLINE
  }

  input UserPaymentCreateInput {
    user: ID
    batch: ID!
    feePlan: ID!
    installmentId: ID
    image: ImageInput
    imageUrl: String
  }

  input ImageInput {
    publicId: String
    secureUrl: String
  }

  type UserPaymentData {
    _id: ID
    user: User!
    batch: Batch!
    feePlan: FeePlan!
    installmentId: ID
    isApproved: Boolean
    isRejected: Boolean
    isPending: UserPaymentPendingType
    image: CoverImageType
    createdAt: String
    updatedAt: String
  }

  type UserPaymentPendingType {
    totalAmount: String
    totalPendingAmount: String
  }

  type UserPaymentDataOutput {
    userPaymentData: UserPaymentData
    response: CustomResponseType!
  }

  type UserAllPaymentDataOutputType {
    userPaymentData: [UserPaymentData]
    response: CustomResponseType
  }
  type UserAllFeePlanDataOutputType {
    feePlanData: [FeePlan]
    response: CustomResponseType
  }

  input MeetingDataInputType {
    meetingNumber: String!
    meetingCode: String!
    title: String!
    password: String!
    link: String
    isActive: Boolean
    scheduledAt: String
    isPaid: Boolean
    description: String
  }

  type MeetingDataType {
    meetingNumber: String
    password: String
    meetingCode: String
    title: String
    link: String
    isActive: Boolean
    scheduledAt: String
    isPaid: Boolean
    description: String
  }

  type MeetingDataOutputType {
    meetingData: MeetingDataType
    response: CustomResponseType
  }
  type CitiesOutputType {
    cityData: [String]
    response: CustomResponseType!
  }

  input MeetingListFilterInputType {
    isActive: Boolean
    isPaid: Boolean
    scheduledAt: DateTime
    title: String
  }

  type MeetingListOutputType {
    meetingList: [MeetingDataType]
    response: CustomResponseType
  }

  type UserDataOutputType {
    userData: UserSchemaType
    response: CustomResponseType
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
    profileImage: ProfileImageType
  }

  input UpdateMeetingInputFilter {
    meetingNumber: String
    title: String
    meetingCode: String
  }

  input UpdateMeetingInputDataType {
    meetingNumber: String
    meetingCode: String
    password: String
    title: String
    link: String
    isActive: Boolean
    scheduledAt: String
    isPaid: Boolean
    description: String
  }

  input GetMeetingFilterInputType {
    meetingNumber: String
    meetingCode: String
    title: String
  }

  scalar DateTime
  scalar JSON
`;

export default typeDefs;
