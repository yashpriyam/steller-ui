import { CSSProperties, ChangeEvent, ReactElement, MouseEventHandler, SetStateAction, ReactNode } from "react";

declare global {

  type RegisterUserData = {
    name: string;
    email: string;
    phoneNumber: string;
    isJobSeeker: boolean;
    occupation: string;
    sessionPreference: string;
    expectedSalary: string;
    emailOtp: string;
    collegeName: string;
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
    userId: string;
    questionId: QuestionDataType,
    isCorrect: boolean
    response: QuestionOptionType[]
  }
  interface QuestionStateInterface {
    attemptedQuestions: AttemptedQuestionDataType[]
    nonAttemptedQuestions: QuestionDataType[];
    totalAttemptedQuestions: number;
    totalNonAttemptedQuestions: number;
    totalQuestions: number;
  }

  type QuestionDataType = {
    id: string;
    title: QuestionOptionType[];
    questionType: QuestionTypeEnum;
    options: QuestionOptionType[];
    answer: QuestionOptionType[];
    marks: number;
    batchCode: string;
    meta: QuestionMetaDataType;
    isCorrect?: boolean;
    isAnswered?: boolean;
  };

  type QuestionMetaDataType = {
    topic: string;
    day: number;
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
    fillup = "fillup"
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
    isLoading: boolean;
    errorMsg?: string;
    successMsg?: string;
    isAnswered?: boolean;
    isCorrect?: boolean;
  }

  type QuestionSelectedValueType = {
    text?: string;
    value?: string;
    imageUrl?: string;
    iframe?: string;
    __typename?: string;
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

  type QuestionOptionType = {
    imageUrl?: string;
    text?: string;
    iframe?: string;
    isChecked?: boolean;
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
  }

  interface SidebarOptionInterface {
    text: string | number;
    image: string | React.ReactNode;
    count?: string | number;
    showText?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
  }

  interface SidebarContainerProps {
    heading?: string;
    children?: React.ReactNode;
  }

  interface SidebarProps {
    options?: {
      image: string | React.ReactNode;
      url: string;
      text: string;
    }[],
    optionAtLast?: {
      text: string;
      onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    }
  }

  type UseAppDataReturnType = {
    sidebarData: SidebarProps;
    monorepoPaths: Record<string, boolean>;
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
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
}
export { };