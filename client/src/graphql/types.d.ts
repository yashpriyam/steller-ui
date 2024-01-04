import { ChangeEvent, ReactElement } from "react";

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
      error?: boolean;
      disabled?: boolean;
      onChange: (e: ChangeEvent<HTMLInputElement>) => void;
      onHover?: (e: React.MouseEvent<HTMLInputElement>) => void;
      className?: string;
    }
    interface IconProps {
      className?: string;
    }
    interface IconProps {
      className?: string;
    }
}
export {}