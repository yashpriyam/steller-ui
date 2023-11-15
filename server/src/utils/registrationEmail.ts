import { EmailType } from "../graphql/types";

export const getRegistrationEmailForUser = ({
  userName,
  phoneNumber,
  email,
}: EmailType) => ({
  subject: "Welcome to WebMasters",
  html: `<b>Hi ${userName},</b>
    <p>Thanks for showing interest in joining WebMasters program to become a top notch Software Developer. We are excited to have you. Here are the responses that you have submitted. </p>
    Name: ${userName}<br>
    Email: ${email} <br>
    Phone number: ${phoneNumber} </p>
    
   <p> Feel free to reply to this email for any further queries. We would be reaching out to you shortly to know more about you. </p>`,
});

export const getRegistrationEmailForAdmin = ({
  userName,
  phoneNumber,
  email,
  time,
}: EmailType) => ({
  subject: `${userName} registered to WebMasters`,
  html: ` 
    Name: ${userName} <br>
    Email: ${email} <br>
    Phone number: ${phoneNumber} <br>
    Time: ${time} <br>`,
});
