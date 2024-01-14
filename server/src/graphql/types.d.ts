import { Request, Response } from "express";
import { ObjectId } from "mongoose";

declare global {
  type ContextType = {
    req: Request;
    res: Response;
  };

  type MailResponseType = {
    html: string;
    subject: string;
    to: string;
  };

  type MailDataType = {
    html: string;
    subject: string;
  };

  type EmailType = {
    name: string;
    phoneNumber: string;
    email: string;
    time: string;
  };

  enum SessionPreferenceEnum {
    online = "online",
    offline = "offline",
  }

  type RegisterOutputType = {
    userData?: RegisterType;
    response: CustomResponseType;
  };  
  type RegisterType = {
    name: string;
    email: string;
    phoneNumber: string;
    isJobSeeker?: boolean;
    occupation?: string;
    sessionPreference?: "online"|"offline";
    expectedSalary?: string;
    collegeName?: string;
  }

  type ProgramDataType = {
    programType: string;
    amount: number;
    title: string;
    isActive: boolean;
  };

  type PaymentDetailsDataType = {
    programType: string;
    amount: number;
    title: string;
    isActive: boolean;
    name: string;
    description: string;
  };

  type CreateTransactionType = {
    amount: number;
    programType: string;
    paymentId: string;
    userId: string;
    isPaymentSuccessfull: boolean;
  };
  type CreateNotesInputType = {
    link: string;
    link: string;
    title: string;
    topics: [string];
    dayNumber: number;
    noOfPages?: number;
    description?: string;
    estimatedReadingTime?: string;
  };
  type CreateNotesOutputType = {
    notesData: NotesDataType;
    response: CustomResponseType;
  };

  type UpdateNotesInputType = {
    title?: string;
    link?: string;
    topics?: [string];
    dayNumber?: number;
    noOfPages?: number;
    description?: string;
    estimatedReadingTime?: string;
  };
  type UpdateNotesOutputType = {
    notesData?: UpdateNotesDataType;
    response: CustomResponseType;
  };
  type UpdateNotesDataType = {
    title: String;
    link: String;
    topics: [String];
    dayNumber: Number;
    noOfPages?: Number;
    description?: String;
    estimatedReadingTime?: String;
  };
  type NotesDataType = {
    title: String;
    link: String;
    topics: [String];
    dayNumber: Number;
    noOfPages?: Number;
    description?: String;
    estimatedReadingTime?: String;
  };

  type VideoOutputDataType = {
    videoData?: VideoDataType;
    response: CustomResponseType;
  };

  type AllVideoOutputDataType = {
    videoData?: [VideoDataType];
    response: CustomResponseType;
  };

  type CreateVideoType = {
    title: string;
    description?: string;
    dayNumber: number;
    videoNumber: number;
    topics: string[];
    links: {
      webmasters?: string;
      youtube: string;
    };
    isActive?: boolean;
    duration?: string;
  };

  type FilteredLinksType = {
    [key: string]: string;
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
  };

  type FilteredLinksType = {
    [key: string]: string;
  };

  type DeletedNotesOutputType = {
    notesData?: DeletedNotesDataType;
    response: CustomResponseType;
  };
  type DeletedNotesDataType = {
    link: string;
    title: string;
    dayNumber: number;
    topics: [string];
    noOfPages?: number;
    description?: string;
    estimatedReadingTime?: string;
  };

  enum QuestionTypeEnum {
    multi = "multi",
    single = "single",
  }

  enum QuestionMetaType {
    timed = "timed",
    recorded = "recorded",
  }

  type QuestionInfoType = {
    text: string 
    imageUrl?: string;
    iframe?: string; 
  }

  type QuestionSchemaType = {
    title: QuestionInfoType[];
    questionType: QuestionTypeEnum;
    options: QuestionInfoType[];
    answer: QuestionInfoType[];
    marks: number;
    batchCode: string;
    meta: QuestionMetaData;
  };

  type QuestionOptionType = {
    text: string;
    imageUrl?: string;
    iframe?: string; 
  }

  type AllQuestionDataType = {
    id: ObjectId;
    title: QuestionOptionType[];
    questionType: QuestionTypeEnum;
    options: QuestionOptionType[];
    answer: QuestionOptionType[];
    marks: number;
    batchCode: string;
    meta: QuestionMetaData;
  }

  type QuestionMetaData = {
    topic: string;
    day: number;
    isActive: boolean;
    isArchived: boolean;
    type: QuestionMetaType;
    expiresInMins: number;
    isOpenable: boolean;
  };
  type GetNotesFilterInputType = {
    link?: string;
    title?: string;
    dayNumber?: number;
    topics?: [string];
    noOfPages?: number;
    description?: string;
    estimatedReadingTime?: string;
  };
  type getAllNotesOutputType = {
    notesData?: [NotesDataType];
    response: CustomResponseType;
  };
  type getNotesOutputType = {
    notesData?: NotesDataType;
    response: CustomResponseType;
  };

  type QuestionAttemptSchemaType = {
    userId: ObjectId;
    questionId: ObjectId;
    response: QuestionInfoType[];
    isCorrect?: boolean;
    timestamp: Date;
  };

  type UserActivityInputType = {
    phoneNumber?: string;
    isOpened?: boolean;
    devices?: string[];
    IST?: string;
    isValidPhoneNumber?: boolean;
  };

  type UserActivityData = {
    phoneNumber?: string;
    isOpened?: boolean;
    devices?: string[];
    IST: string;
    time?: string;
    isValidPhoneNumber?: boolean;
    createdAt: Date;
    updatedAt: Date;
  };

  type UserActivityOutputType = {
    UserActivityData?: UserActivityData;
    response: CustomResponseType;
  };

  type CreateQuestionOutputType = {
    questionData?: QuestionSchemaType;
    response: CustomResponseType;
  };
  type UpdateQuestionInputType = {
    questionId: ObjectId;
    updates: QuestionData;
  };
  type QuestionData = {
    title?: QuestionOptionType[];
    options?: QuestionOptionType[];
    questionType?: QuestionTypeEnum;
    answer?: QuestionOptionType[];
    marks?: number;
    batchCode?: string;
    meta: QuestioinMetaDataUpdate;
  };
  type QuestioinMetaDataUpdate = {
    topic?: string;
    day?: number;
    isActive?: boolean;
    isArchived?: boolean;
    type?: QuestionMetaType;
    expiresInMins?: number;
    isOpenable?: boolean;
  };
  type UpdateQuestionOutputType = {
    questionData?: QuestionDataType;
    response: CustomResponseType;
  };
  type QuestionDataType = {
    title: QuestionOptionType[];
    options: QuestionOptionType[];
    questionType: QuestionTypeEnum;
    answer: QuestionOptionType[];
    marks: number;
    batchCode: string;
    meta: QuestionUpdateOutputMetaData;
  };
  type QuestionUpdateOutputMetaData = {
    topic: string;
    day: number;
    isActive: boolean;
    isArchived: boolean;
    type: QuestionMetaType;
    expiresInMins: number;
    isOpenable: boolean;
  };
  type CreateUserOtpType = {
    email: string;
    emailOtp: string;
    expiresAt: Date;
    isEmailVerified?: boolean;
    id?: ObjectId;
  };
  type OtpUserOutputType = {
    response: CustomResponseType;
  };
  type filterInputType = {
    topic?: string;
    isActive?: boolean;
    isArchived?: Boolean;
    type?: QuestionMetaType;
  };
  type QuestionsReturnType = {
    questionData: [AllQuestionDataType];
    response: CustomResponseType;
  };
  type CustomResponseType = {
    status: number;
    message: string;
  };
  type EmailOtpDataType = {
    otpData: { emailOtp : string};
    emailValidityMinutes: number;
  };

  interface QuestionResponseType {
    text: string;
    imageUrl?: string;
    iframe?: string;
  }
  interface UploadImageArgumentType {
    images: string | string[];
    folder: string;
  }
  interface ImageUploadArgs {
    image: string;
  }
  type DaySchemaType = {
    title: string;
    description: string;
    dayNumber: Number;
    topics: string[];
    notes: string[];
    videos: string[];
    questions: string[];
  };
  type loginUserInputType = {
    email: string;
    password: string;
  };
  type PaidProfileImageInput = {
    publicId?: string;
    secureUrl?: string;
  };
  type SocialMediaHandles = {
    linkedIn?: string;
    github?: string;
    medium?: string;
    portfolio?: string;
  };
  type Password = {
    hash?: string;
    salt?: string;
  };
  type PaidUserInputType = {
    username: string;
    email: string;
    contact: string;
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
  type PaidUserOutputType = {
    paidUserData?: PaidUserData;
    response: CustomResponseType;
  };
  type PaidUserData = {
    username: string;
    email: string;
    contact: string;
    profileImg?: PaidProfileImageInput;
    batchCode?: string;
    professionalStatus?: string;
    college?: string;
    expectedSalary?: string;
    socialHandles?: SocialMediaHandles;
    address?: string;
    sessionPreference? = SessionPreferenceEnum;
  };
  type updatePaidUserPasswordInput = {
    email: String;
    password?: string;
  };
  type WeekDataType = {
    batchCode?: string;
    weekNumber?: number;
    description?: string;
    title?: string;
    isActive?: boolean;
    isDisabledForUnpaidUsers?: boolean;
    days?: ObjectId[];
  }


  interface paidUserSchemaType {
    username: string;
    email: string;
    contact: string;
    profileImg?: {
      publicId?: string;
      secureUrl?: string;
    };
    batchCode?: string;
    sessionPreference?: string;
    professionalStatus?: string;
    college?: string;
    expectedSalary?: string;
    socialHandles?: {
      linkedIn?: string;
      github?: string;
      medium?: string;
      portfolio?: string;
    };
    address?: string;
    password?: string;
    personalDetail?: {
      fullName: string;
      headline?: string;
    };
    socialDetail?: {
      address: {
        colony?: string;
        city?: string;
      };
      phoneNumber?: string;
      gmail?: string;
      githubLink?: string;
      linkedInLink?: string;
    };
    experienceData?: Array<{
      companyName?: string;
      companyLocation?: string;
      role?: string;
      startDate?: string;
      endDate?: string;
      description?: string[];
      techStack?: string[];
    }>;
    projectsData?: Array<{
      heading?: string;
      description?: string[];
      deployLink?: string;
      gitHubLink?: string;
      techStack?: string[];
    }>;
    skillsData?: {
      language?: string[];
      frontend?: string[];
      backend?: string[];
      database?: string[];
      versionControl?: string[];
      cIcD?: string[];
    };
    educationalData?: Array<{
      instituteName?: string;
      location?: string;
      course?: string;
      startDate?: string;
      endDate?: string;
      cgpa?: string;
    }>;
    achievementsData?: Array<{
      icon?: string;
      header?: string;
      description?: string;
      links?: string;
    }>;
  }

  type AllWeekDataOutputType = {
    weekData?: WeekDataType[];
    response: CustomResponseType;
  };
  type UpdateUserPasswordInput = {
    email: stringtring;
    password: string;
  }

}
