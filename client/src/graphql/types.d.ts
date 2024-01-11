import { CSSProperties, ChangeEvent, ReactElement } from "react";

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
  interface ProfileProps {
    dataProfile: ResumeData;
  }
  interface SkillsSectionProps {
    skillsData: SkillsData;
  }
  type UserActivityDataType = {
    phoneNumber: string;
    isOpened: boolean;
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

  type CustomResponseType = {
    status: number;
    message: string;
  };

  interface RoutesMapInterface {
    [path: string]: ReactElement;
  }
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
  }

  interface QuestionStateInterface {
    questionList: QuestionDataType[];
  }

  type QuestionDataType = {
    id: string;
    question: ImageAndTextType[];
    questionType: QuestionTypeEnum;
    options: ImageAndTextType[];
    answer: ImageAndTextType[];
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
  }

  type QuestionSelectedValueType = {
    text: string | null;
    value?: string;
    imageUrl: string | null;
    __typename?: string;
  };

  type CheckboxValueType = {
    text: string | null;
    value?: string;
    imageUrl: string | null;
  };

  interface QuestionAttemptStateInterface {
    isLoading: boolean;
  }

  type ImageAndTextType = {
    imageUrl: string | null;
    text: string | null;
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
   type updatePaidUserInput = {
     email: String;
     updatedNewData: UpdatePaidDataType;
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
}
export { };