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
  interface TopButtonProps {
    topButtonTagOne?: string;
    topButtonTagTwo?: string;
  }

  type Thoughts = {
    icon: ReactElement;
    thought: string;
    tag: string;
  };

  interface ThoughtsProps {
    thoughtComponentTitle?: string;
    thoughtComponentSubtitle?: string;
    thoughtElement?: Thoughts[];
  }
  type StackBox = {
    icon: string;
    title: string;
    subtitle: string;
  };

  interface StackComponentProps {
    stackComponentTitle?: string;
    stackComponentSubtitle?: string;
    stackElement?: StackBox[];
  }

  type ServiceBox = {
    icon: ReactElement;
    title: string;
    subtitle: string;
    buttonText: string;
  };

  interface ServiceComponentProps {
    serviceElements?: ServiceBox[];
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
    overviewButtonOne?:string;
    overviewButtonTwo?:string;
}
type newsDrop = {
    image: string;
    title: string;
    description: string;
  };
  
  interface NewsDropProps {
    newsDropTitile?:string;
    newsDropElements?: newsDrop[];
  }

  interface DashboardProps {
    className?: string;
    pageTitle?: string;
    pageSubtitle?: string;
    topButtonTagOne?: string;
    topButtonTagTwo?: string;
    newsDropTitile?: string;
    newsDropElements?: newsDrop[];
    thoughtComponentTitle?: string;
    thoughtComponentSubtitle?: string;
    thoughtElement?: Thoughts[];
    serviceElements?: ServiceBox[];
    stackComponentTitle?: string;
    stackComponentSubtitle?: string;
    stackElement?: StackBox[];
    courseImageElement?: CourseImage[];
    overviewTitle?: string;
    overviewMainContent?: string;
    overviewSubcontent?: string;
    courseDetailsTitle?: string;
    courseDetails?: string[];
    overviewButtonOne?: string;
    overviewButtonTwo?: string;
  }
type CourseImage = {
    image: string;
    courseTitle: string;
    courseSubtitle: string;
  };

interface CourseImageProps {
    courseImageElement?: CourseImage[];
}  
}
export {};
