import { ReactElement } from "react";

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
  };

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

  interface CheckboxProps {
    className?: string;
    options: { text: string; value: string }[];
    bgColor?: string;
    textColor?: string;
    onSelect?: (currentSelected: {}, selectedValues: {}[]) => void;
    style?: React.CSSProperties;
    direction?: "row" | "column";
    title?: string;
  }

  interface QuestionStateInterface {
    questionList: QuestionDataType[];
  }

  type QuestionDataType = {
    question: { imageUrl: string; text: string }[];
    questionType: QuestionTypeEnum;
    options: { imageUrl: string; text: string }[];
    answer: { imageUrl: string; text: string }[];
    marks: number;
    batchCode: string;
    meta: QuestionMetaDataType;
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
}
export {};
