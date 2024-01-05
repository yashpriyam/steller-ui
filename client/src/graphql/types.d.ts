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
}
export {}