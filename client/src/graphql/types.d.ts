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

  interface SocialDetail {
    address: Address;
    phoneNumber: string;
    gmail: string;
    githubLink: string;
    linkedInLink: string;
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
}
export { }