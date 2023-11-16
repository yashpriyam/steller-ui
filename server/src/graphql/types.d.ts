import { Request, Response } from "express";

type ContextType = {
  req: Request;
  res: Response;
};

type MailResponseType = {
  html: string;
  subject: string;
  to: string;
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
