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
    onSelect?: (currentSelected: {}, selectedValues: Record<number, CheckboxValueType>) => void;
    style?: React.CSSProperties;
    direction?: "row" | "column";
    title?: string;
  }

  interface QuestionStateInterface {
    questionList: QuestionDataType[];
  }

  type QuestionDataType = {
    id: string;
    question: { imageUrl: string; text: string }[];
    questionType: QuestionTypeEnum;
    options: { imageUrl: string; text: string }[];
    answer: { imageUrl: string; text: string }[];
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
  }

  type QuestionSelectedValueType = {
    text: string;
    value?: string;
    imageUrl: string;
    __typename?: string;
  }

  type CheckboxValueType = {
    text: string;
    value?: string;
    imageUrl: string;
  };
}
export {};
