declare global {
    type RegisterUserData = {
        name: string;
        email: string;
        phoneNumber: string;
        isJobSeeker: boolean;
        occupation: string;
        sessionPreference: string;
        expectedSalary: string;
    }
}
export {}