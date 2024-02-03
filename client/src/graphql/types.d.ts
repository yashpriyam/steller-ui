import { CSSProperties, ChangeEvent, ReactElement, MouseEventHandler, SetStateAction, ReactNode,ChangeEventHandler,
} from "react";

declare global {

  type RegisterUserData = {
    _id?: string;
    name: string;
    email: string;
    phoneNumber: string;
    isJobSeeker: boolean;
    occupation: string;
    sessionPreference: string;
    expectedSalary: string;
    emailOtp: string;
    collegeName: string;
    courseYear: string;
    course: string;
    branch: string;
    location: string;
    batchCode: string;
    feePlan?: string
    profileImage: string;
  }

  interface Experience {
    companyName: string;
    companyLocation: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string[];
    techStack: string[];
  }

  interface Project {
    heading: string;
    description: string[];
    deployLink: string;
    gitHubLink: string;
    techStack?: string[];
  }

  interface Achievement {
    icon: string;
    header: string;
    description: string;
    links: string;
  }

  interface SkillsData {
    [key: string]: string[];
  }

  interface EducationalData {
    instituteName: string;
    location: string;
    course: string;
    startDate: string;
    endDate: string;
    CGPA: string;
  }

  interface ResumeData {
    personalDetail: {
      fullName: string;
      headline: string;
    };
    socialDetail: SocialDetail;
    experienceData: Experience[];
    projectsData: Project[];
    skillsData: SkillsData;
    educationalData: EducationalData[];
    achievementsData: Achievement[];
  }

  interface SkillsSectionProps {
    skillsData?: SkillsData;
    mobileViewOn?: boolean;
  }

  interface ProfileProps {
    dataProfile: ResumeData;
  }

  interface Address {
    colony: string;
    city: string;
  }

  interface ProfileAvatarProps {
    width?: string;
    height?: string;
    className?: string;
  }

  interface SocialDetail {
    address: Address;
    phoneNumber: string;
    gmail: string;
    githubLink: string;
    linkedInLink: string;
  }

  type StyleIconSubContainer = {
    alignItems: "flex-start" | "center";
  };

  type CustomResponseType = {
    status: number;
    message: string;
  }

  interface RoutesMapInterface {
    [path: string]: ReactElement;
  }

  type UserActivityDataType = {
    phoneNumber: string;
    isOpened: boolean;
  };

  interface TopButtonProps {
    topButtonTagOne?: string;
    topButtonTagTwo?: string;
  }

  type ThoughtsType = {
    icon: ReactElement;
    thought: string;
    tag: string;
  };

  interface ThoughtsProps {
    thoughtComponentTitle?: string;
    thoughtComponentSubtitle?: string;
    thoughtElement?: ThoughtsType[];
  }

  type StackBoxType = {
    icon: string;
    title: string;
    subtitle: string;
  };

  interface StackComponentProps {
    stackComponentTitle?: string;
    stackComponentSubtitle?: string;
    stackElement?: StackBoxType[];
  }

  type ServiceBoxType = {
    icon: ReactElement;
    title: string;
    subtitle: string;
    buttonText: string;
    onClick?: ()=> void;
    isBtnEnabled?: boolean;
  };

  interface ServiceComponentProps {
    serviceElements?: ServiceBoxType[];
  }

  interface PageTitleProps {
    title?: string;
    subtitle?: string;
  }

  interface OverviewComponentProps {
    overviewTitle?: string;
    overviewMainContent?: string;
    overviewSubcontent?: string;
    courseDetailsTitle?: string;
    courseDetails?: string[];
    overviewButtonOne?: string;
    overviewButtonTwo?: string;
  }

  type NewsDropType = {
    image: string;
    title: string;
    description: string;
  };

  interface NewsDropProps {
    newsDropTitile?: string;
    newsDropElements?: NewsDropType[];
  }

  interface DashboardProps {
    className?: string;
    pageTitle?: string;
    pageSubtitle?: string;
    topButtonTagOne?: string;
    topButtonTagTwo?: string;
    newsDropTitile?: string;
    newsDropElements?: NewsDropType[];
    thoughtComponentTitle?: string;
    thoughtComponentSubtitle?: string;
    thoughtElement?: ThoughtsType[];
    serviceElements?: ServiceBoxType[];
    stackComponentTitle?: string;
    stackComponentSubtitle?: string;
    stackElement?: StackBoxType[];
    courseImageElement?: CourseImageType[];
    overviewTitle?: string;
    overviewMainContent?: string;
    overviewSubcontent?: string;
    courseDetailsTitle?: string;
    courseDetails?: string[];
    overviewButtonOne?: string;
    overviewButtonTwo?: string;
  }

  type CourseImageType = {
    image: string;
    courseTitle: string;
    courseSubtitle: string;
  };

  interface CourseImageProps {
    courseImageElement?: CourseImageType[];
  }

  interface InputProps {
    type: string;
    value?: string;
    placeholder?: string;
    errorMessage?: string;
    disabled?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onHover?: (e: React.MouseEvent<HTMLInputElement>) => void;
    className?: string;
    height?: string;
    width?: string;
    backgroundColor?: string;
    style?: CSSProperties;
  }

  interface OpenIconProps {
    className?: string;
  }

  interface CloseIconProps {
    className?: string;
  }

  interface CheckboxProps {
    className?: string;
    options: CheckboxValueType[];
    bgColor?: string;
    textColor?: string;
    onSelect?: (
      currentSelected: {},
      selectedValues: Record<number, CheckboxValueType>
    ) => void;
    style?: React.CSSProperties;
    direction?: "row" | "column";
    title?: string;
    isIncorrect?: boolean;
    type: "single" | "multi"
  }


  type AttemptedQuestionDataType = {
    _id: string;
    isAnswered: boolean;
    title: QuestionInfoType[];
    questionType: QuestionTypeEnum;
    options: QuestionInfoType[];
    answer: QuestionInfoType[];
    marks: number;
    meta: QuestionMetaDataType;
    isCorrect?: boolean;
  };
  interface QuestionStateInterface {
    questions?: [AttemptedQuestionDataType];
    totalQuestions?: number;
    totalCorrectQuestions?: number;
    totalInCorrectQuestions?: number;
    totalUnAttemptedQuestions?: number;
    response?: CustomResponseType;
  }

  type QuestionDataType = {
    _id: string;
    title: QuestionOptionType[];
    questionType: QuestionTypeEnum;
    options: QuestionOptionType[];
    answer: QuestionOptionType[];
    marks: number;
    meta: QuestionMetaDataType;
    isCorrect?: boolean;
    isAnswered?: boolean;
  };

  type QuestionMetaDataType = {
    topic: string;
    day: number;
    week: number;
    batchCode: string;
    isActive: boolean;
    isArchived: boolean;
    type: QuestionMetaType;
    expiresInMins: number;
    isOpenable: boolean;
  };

  enum QuestionMetaType {
    timed = "timed",
    recorded = "recorded",
  }

  enum QuestionTypeEnum {
    multi = "multi",
    single = "single",
    fillup = "fillup",
    codeblock = "codeblock"
  }

  interface QuestionResponseType {
    text: string;
    imageUrl: string;
  }

  interface QuestionAccordionProps {
    questionData: QuestionDataType;
    onSubmit: (
      questionData: QuestionDataType,
      selectedValues: QuestionSelectedValueType[]
    ) => {};
    isLoading?: boolean;
    errorMsg?: string;
    successMsg?: string;
    isAnswered?: boolean;
    isCorrect?: boolean;
    className?: string;
    index?: number;
  }

  type QuestionSelectedValueType = {
    text?: string;
    imageUrl?: string;
    iframe?: string;
  };

  type CheckboxValueType = {
    value?: string;
    text?: string;
    imageUrl?: string;
    iframe?: string;
    isChecked?: boolean;
  };

  interface QuestionAttemptStateInterface {
    isLoading: boolean;
  }

  type CodeBlockOpenWindowsType = {
    enableUserSelection: boolean;
    isEditable: boolean;
    predefinedCode: string;
    title: string;
  }

  type CodeBlockConfigurationType = {
    showOutputWindow: boolean;
    showSplitWindow: boolean;
    openWindows: [CodeBlockOpenWindowsType];
  }

  type CodeBlockType = {
    enableCodeBlock: boolean;
    configuration: CodeBlockConfigurationType
  }

  type QuestionOptionType = {
    imageUrl?: string;
    text?: string;
    iframe?: string;
    isChecked?: boolean;
    codeBlock: CodeBlockType
  };

  type VideoDataType = {
    title?: string;
    description?: string;
    dayNumber?: number;
    videoNumber?: number;
    topics?: string[];
    links?: {
      webmasters?: string;
      youtube?: string;
    };
    isActive?: boolean;
    duration?: string;
  }

  type VideoDataStateType = {
    videoList: VideoDataType[];
  }

  type NotesFilterDataType = {
    title?: string;
    link?: string;
    topics?: [string];
    dayNumber?: number;
    weekNumber?: number;
    noOfPages?: number;
    description?: string;
    estimatedReadingTime?: string;
  }

  type NotesDataType = {
    title: string;
    link: string;
    topics: [string];
    dayNumber: number;
    noOfPages: number;
    description: string;
    estimatedReadingTime: string;
  }

  type NotesDataStateType = {
    noteList: NotesDataType[];
  }

  interface DayPagePropsInterface {
    className?: string;
    title?: React.ReactNode | string;
  }

  interface LoginComponentProps {
    handleLoginClick: () => Promise<boolean>;
    handleOnForgetPasswordClick: () => void;
  }

  interface LoginProps {
    className?: string;
    style?: React.CSSProperties;
    bgColor?: string;
    textColor?: string;
    closeModal?: () => void;
  }

  interface CreatePasswordProps {
    handleOnCreateNewPassword?: () => void;
  }

  interface OtpVerificationProps {
    handleOnSendOtp: () => Promise<boolean>;
    verifyOtp: (otp: string) => Promise<boolean>;
    onBackClick: () => void;
  }

  type LoginUser = {
    email: string;
    password: string;
  };

  type UpdatePaidDataType = {
    username?: string;
    contact?: string;
    profileImg?: PaidProfileImageInput;
    batchCode?: string;
    sessionPreference?: SessionPreferenceEnum;
    professionalStatus?: string;
    college?: string;
    expectedSalary?: string;
    socialHandles?: SocialMediaHandles;
    address?: string;
    password?: string;
  };

  interface LoginState {
    email: string;
    isOtpSend: boolean;
    isOtpValid: boolean;
    isOtpSending: boolean;
    password: string;
  }

  interface ModalProps {
    className?: string;
    style?: React.CSSProperties;
    bgColor?: string;
    children?: React.ReactNode;
    isClosable?: boolean;
    onClose?: () => void;
    isOpen?: boolean;
  }

  interface SvgIconProps {
    height?: string;
    width?: string;
    isDarkMode?: boolean;
    fillColor?: string;
    className?: string;
  }

  interface SidebarOptionInterface {
    isProfile?: boolean;
    text: string | number;
    image: string | React.ReactNode;
    count?: string | number;
    showText?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    url?:string;
  }

  interface SidebarContainerProps {
    heading?: string;
    children?: React.ReactNode;
  }

  interface SidebarProps {
    profile?: {
      image: string | ReactNode;
      url?: string;
      text: string;
      openNewPage?: boolean;
    },
    options?: {
      image: string | React.ReactNode;
      url: string;
      text: string;
      openNewPage?: boolean;
    }[],
    optionAtLast?: {
      text: string;
      onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    },
    optionsAtFirst?: {
      image: string | ReactNode;
      url?: string;
      text: string;
      openNewPage?: boolean;
      onClick?: (e: MouseEvent<HTMLDivElement>) => void;
      isProfile?: boolean;
    }[],
    admin?: {
      image: string | ReactNode;
      url?: string;
      text: string;
      openNewPage?: boolean;
      onClick?: (e: MouseEvent<HTMLDivElement>) => void;
      isProfile?: boolean;
    } | false
  }

  type UseAppDataReturnType = {
    sidebarData: SidebarProps;
    monorepoPaths: Record<string, boolean>;
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
    isLoggedIn: boolean;
    user: {
      userData: UserSchemaType;
      isLoggedIn: boolean;
      isAdmin: boolean;
    };
  }

  type SetCookieArgsType = {
    key: string;
    value: string;
  }
  type WeekDataType = {
    batchCode?: string;
    weekNumber?: number;
    description?: string;
    title?: string;
    isActive?: boolean;
    isDisabledForUnpaidUsers?: boolean;
    days?: ObjectId[];
  }
  type ScheduleDataStateType = {
    weekList: WeekDataType[];
    isScheduleDataLoading: boolean;
  }
  type DayDataType = {
    _id?: ObjectId;
    batchCode?: string;
    weekNumber?: number;
    dayNumber?: number;
    title?: string;
    description?: string;
    topics?: string[];
    notes?: ObjectId[];
    videos?: ObjectId[];
    questions?: ObjectId[];
    date?: Date;
  };
  interface AccordionPropsInterface {
    className?: string;
    title?: ReactNode | string;
    children?: ReactNode;
    style?: CSSProperties;
    icon?: ReactNode | string;
    closeOnOutsideClick?: boolean;
    iconPosition?: "left" | "center" | "right";
    titlePosition?: "left" | "center" | "right";
    disabled?: boolean;
    subTitle?: string;
  }
  interface SchedulePagePropsInterface {
    className?: string;
    style?: CSSProperties;
  }
  interface GetAllQuestionProps {
    day?:number;
    week?:number;
    batchCode?:string;
    isActive?:boolean;
    isArchived?:boolean;
    topic?:string;
    skip?:number;
    limit?:number;
  }
  type CityDataStateType = {
    cityList?: string[];
  }

  
  type BatchSchemaType = {
    batchCode: string;
    paymentType?: FeePlanSchemaType; 
    paidStudents?: UserSchemaType[];
    registeredStudents?: UserSchemaType[];
    demoStudents?: UserSchemaType[];
    startDate?: Date
  };

  type FeePlanSchemaType = {
    _id?: string
    batchCode?: string;
    name?: string;
    description?: string;
    installments?: Installment[],
    miscellaneous?: JSON
  };

  type Installment = {
    _id?: string | undefined;
    id? :string;
    amount?: string;
    sequence?: string;
    dueDate?: Date; 
    accessWeeks?: WeekDataType[]; // we'll store week data here
    miscellaneous?: JSON;
    isApproved?: boolean;
    isRejected?:boolean;
    isPending?: boolean;
  }

  type UserPaymentSchemaType = {
    _id?: string;
    user: PaidUserInputType; 
    batch: BatchSchemaType; 
    feePlan: FeePlanSchemaType; 
    installmentId?: string;
    isApproved?: boolean;
    isRejected?: boolean;
    isPending?: {
      totalAmount?: string;
      totalPendingAmount?: string;
    },
    image?: ImageInputType;
    createdAt?: Date;
    updatedAt?: Date

  };  
   
  type BatchDataOutputType = {
    batchData?: BatchSchemaType;
    response: CustomResponseType;
  };
  type FeePlanDataOutputType = {
    feePlanData?: FeePlanSchemaType;
    response: CustomResponseType;
  };

  type UserPaymentDataOutputType = {
    userPaymentData?: UserPaymentSchemaType;
    response: CustomResponseType;
  }

  type UserAllPaymentDataOutputType = {
    userPayments?: UserPaymentSchemaType[];
    response: CustomResponseType;
  }
  type UserAllFeePlanDataOutputType = {
    feePlans?: FeePlanSchemaType[];
    response: CustomResponseType;
  }
  
  type MeetingSchemaType = {
    meetingNumber: string;
    password: string;
    link?: string;
    scheduledAt?: Date;
    isActive: boolean;
    isPaid: boolean;
  }
  
  type MeetingReturnType = {
    meetingData?: MeetingSchemaType,
    response: CustomResponseType
  }
  interface InstallmentCardProps {
    installment: Installment;
    index?: number
  }

  type User = {
    username?: string;
    contact?: string;
    profileImg?: PaidProfileImageInput;
    batchCode?: string;
    sessionPreference?: SessionPreferenceEnum;
    professionalStatus?: string;
    college?: string;
    expectedSalary?: string;
    socialHandles?: SocialMediaHandles;
    address?: string;
    password?: string;
  };


  interface UserSchemaType {
    email: string;
    name: string;
    phoneNumber: string;
    password?: string;
    isJobSeeker: boolean;
    occupation?: string;
    sessionPreference: "online" | "offline";
    expectedSalary?: string;
    IST: string;
    collegeName?: string;
    profileImage?: ProfileImageType;
    coverImage?: ProfileImageType;
    userProfile?: Types.ObjectId;
    batchCode?: string;
    courseYear?: string;
    course?: string;
    branch?: string;
    location?: string;
    feePlan?: string;
  }

  type SecondaryUserSchemaType = {
    [key: string]: string | undefined;
    name?: string;
    phoneNumber?: string;
    password?: string;
    occupation?: string;
    sessionPreference?: string;
    collegeName?: string;
    location?: string;
    courseYear?: string;
    course?: string;
    branch?: string;
  };


  type PartialUserSchemaType = {
    email?: string;
    name?: string;
    phoneNumber?: string;
    password?: string;
    isJobSeeker?: boolean;
    occupation?: string;
    sessionPreference?: string;
    expectedSalary?: string;
    IST?: string;
    collegeName?: string;
    location?: string;
    courseYear?: string;
    course?: string;
    branch?: string;
    batchCode?: string;
    feePlan?: string;
  };

  type UpdateUserInput = {
    feePlan?: string
    name?: string;
    phoneNumber?: string;
    password?: string;
    isJobSeeker?: boolean;
    occupation?: string;
    sessionPreference?: string;
    expectedSalary?: string;
    IST?: string;
    collegeName?: string;
    location?: string;
    courseYear?: string;
    course?: string;
    branch?: string;
    feePlan?: string;
  };
  type InstallmentListProps ={
      allInstallment?: Installment[];
      userIntsallment?: UserPaymentSchemaType[];
      userFeePlan?: FeePlanSchemaType;
      setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
      isLoading?: boolean
  }
 
  type UserPaymentInputType = {
    batch?: string; 
    feePlan?: string;
    installmentId: string
    imageUrl?: string
  }
  interface InstallmentItemProps {
    installment: Installment;
    handlePayNow: (installment: Installment, paymentReceipt: File | null) => Promise<void>;
    isLoading?: boolean
  }
  
  type GenerateZoomSignForUserArgsType = {
    meetingNumber: string;
    sdkKey: string;
    sdkSecret: string;  
  }

  interface ZoomConfigType {
    sdkKey: string;
    sdkSecret: string;
    meetingNumber: string;
    password: string;
    userName: string;
    leaveUrl: string;
    onSuccess?: (res: ZoomResponseType | unknown) => void;
    onError?: (res: ZoomResponseType | unknown) => void;
  }

  type ZoomResponseType = {
    errorCode : number;
    errorMessage : string | null;
    method : string; 
    result : string | null; 
    status : boolean; 
  }

  type MeetingDataType = {
    meetingNumber: string;
    password: string;
    meetingCode: string;
    title: string;
    link?: string;
    isActive: string | null;
    isPaid: string | null;
    scheduledAt: Date | null;
    description: string | null;
  }

  type MeetingStateType = {
    meetingList: MeetingDataType[];
  } 
  type ProfileImageType = {
    publicId?: string
    secureUrl?: string
  }
  interface UploadImagePropsInterface {
    className?: string;
    disable?: boolean;
    multiple?: boolean;
    text?: string | ReactNode;
    style?: CSSProperties;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    url?: string;
  }
  interface UserInfoSubCardPropsInterface {
    editing?: boolean;
    userInputValue?: SecondaryUserSchemaType;
    value?: string;
    field?: string;
    text: string;
    autoFocus?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>, field: string) => void;
    errorMessage?: string;
    className?: string;
  }
  interface UserPagePropsInterFace {
    className?: string;
  }
  type nonEditableUserSchemaFieldsType = {
    [key: string]: boolean;
    email?: boolean;
    batchCode?: boolean;
  }

  interface DataContextProps {
    html: string;
    setHtml: React.Dispatch<React.SetStateAction<string>>;
    css: string;
    setCss: React.Dispatch<React.SetStateAction<string>>;
    js: string;
    setJs: React.Dispatch<React.SetStateAction<string>>;
  }

  interface CodeDataProviderProps {
    children: ReactNode;
  }

  interface UserCodeStateType {
    userCode: [UserCodeType]
    isSetUserCodeLoading: boolean
    isUserSubmittedCodeLoading: boolean
  }

  interface UserCodeInputType {
    questionId?: string
    weekNumber?: number
    dayNumber?: number
    code?: CodeType
  }

  interface UserCodeType {
    questionId?: string
    weekNumber?: number
    dayNumber?: number
    code?: CodeType
    updatedAt: string
  }

  interface CodeType {
    html: string;
    css: string;
    js: string;
  }

  interface DataContextProps {
    html: string;
    setHtml: Dispatch<SetStateAction<string>>;
    css: string;
    setCss: Dispatch<SetStateAction<string>>;
    js: string;
    setJs: Dispatch<SetStateAction<string>>;
  }

  interface CodeDataProviderProps {
    children: ReactNode;
  }

  interface EditorProps {
    heading: string;
    language: string;
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
    icon: string;
    color: string;
    questionId: string;
  }

  interface LanguageConfig {
    language: string;
    heading: string;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    icon: string;
    color: string;
  }

  type GetAllUserPaymentsInput = {
    isApproved: Boolean
    isRejected: Boolean
    isPending: Boolean
  }
  type AllUsersPaymentDataOutputType = {
    allUsersPayments?: UserPaymentSchemaType[];
    response: CustomResponseType;
  }

  interface UserPaymentCardProps {
    payment: UserPaymentSchemaType;
    onApprove: (paymentId: string) => Promise<boolean | string | undefined>;
    onReject: (paymentId: string) =>  Promise<boolean | string | undefined>;
    setPaymentReceipt: React.Dispatch<React.SetStateAction<File | null>>;
    paymentReceipt: File | null
    isLoading?: boolean;
  }

  type GetMeetingListArgsType = {
    isPaid?: boolean;
    isActive?: boolean;
    scheduledAt?: Date;
    meetingCodeList?: string[];
  }

  type UpdateUserPaymentInput = {
    paymentId: string
    isApproved? :boolean
    isApproved?: boolean;
    isRejected?: boolean;
    isPending?: {
      totalAmount?: string;
      totalPendingAmount?: string;
    },
    image?: string | ArrayBuffer;
    rejectReason?: string
  }

  interface SpinnerProps {
    colors: string[]; 
    width: string;
    height: string;
    theme: 'dark' | 'light';
  }
}
export { };