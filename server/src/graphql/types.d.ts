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
  userName: string;
  phoneNumber: string;
  email: string;
  time: string;
};

type RegisterType = {
  name: string;
  email: string;
  phoneNumber: string;
  isJobSeeker: boolean;
  occupation: string;
  sessionPreference: string;
  expectedSalary: string;
};
