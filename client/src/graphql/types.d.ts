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
  interface LoginComponentProps {
    handleLoginClick: () => Promise<boolean>;
    handleOnForgetPasswordClick: () => void;
  }

  export interface LoginProps {
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
export {};
