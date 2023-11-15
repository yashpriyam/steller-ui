import { Request, Response } from "express";

type contextType = {
  req: Request;
  res: Response;
};

type mailResponseType = {
  html: string;
  subject: string;
  to: string;
};

type emailType = {
  userName: string;
  phoneNumber: string;
  email: string;
  time: string;
};

type registerType = {
  name: string;
  email: string;
  phoneNumber: string;
  isJobSeeker: boolean;
  occupation: string;
  sessionPreference: string;
  expectedSalary: string;
};
