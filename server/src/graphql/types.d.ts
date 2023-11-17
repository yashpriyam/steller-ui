import { Request, Response } from "express";

declare global {
  type ContextType = {
    req: Request;
    res: Response;
  };

  type MailResponseType = {
    html: string;
    subject: string;
    to: string;
  };

  type MailDataType = {
    html: string;
    subject: string;
  };

  type EmailType = {
    name: string;
    phoneNumber: string;
    email: string;
    time: string;
  };

  enum SessionPreferenceEnum {
    online = "online",
    offline = "offline",
  }

  type RegisterType = {
    name: string;
    email: string;
    phoneNumber: string;
    isJobSeeker: boolean;
    occupation: string;
    sessionPreference: SessionPreferenceEnum;
    expectedSalary: string;
  };

  enum ProgramTypeEnum {
    demoCourse = "demoCourse",
    oneWeekProgram = "oneWeekProgram",
    fullCourse = "fullCourse",
  }

  type CreateOrderType = {
    programType: ProgramTypeEnum;
  };

  type ProgramData = {
    programType: ProgramTypeEnum;
    amount: number;
    title: string;
    isActive: boolean;
  }

  type PaymentDetailsData = {
    programType: ProgramTypeEnum;
    amount: number;
    title: string;
    isActive: boolean;
    name: string;
    description: string;
  }
}
