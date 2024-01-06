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

    type UserActivityDataType = {
        phoneNumber: string;
        isOpened: boolean;
    }

    type CustomResponseType = {
        status: number;
        message: string;
    }

    interface RoutesMapInterface {
        [path: string]: ReactElement;
    }
    interface InputProps {
      type: string;
      value?: string;
      placeholder?: string;
      errorMessage?:string;
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
    dayNumber?: Number;
    noOfPages?: Number;
    description?: string;
    estimatedReadingTime?: string;
  }
  type NotesDataType = {
    title: string;
    link: string;
    topics: [string];
    dayNumber: Number;
    noOfPages: Number;
    description: string;
    estimatedReadingTime: string;
  }

  type NotesDataStateType = {
    noteList: NotesDataType[];
  }
}
export {}