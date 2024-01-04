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
    
}
export {}