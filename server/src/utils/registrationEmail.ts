
export const getRegistrationEmailForUser = ({
  name,
  phoneNumber,
  email,
}: EmailType): MailDataType => ({
  subject: "Welcome to WebMasters",
  html: `<b>Hi ${name},</b>
    <p>Thanks for showing interest in joining WebMasters program to become a top notch Software Developer. We are excited to have you. Here are the responses that you have submitted. </p>
    Name: ${name}<br>
    Email: ${email} <br>
    Phone number: ${phoneNumber} </p>
    
   <p> Feel free to reply to this email for any further queries. We would be reaching out to you shortly to know more about you. </p>`,
});

export const getRegistrationEmailForAdmin = ({
  name,
  phoneNumber,
  email,
  time,
}: EmailType): MailDataType => ({
  subject: `${name} registered to WebMasters`,
  html: ` 
    Name: ${name} <br>
    Email: ${email} <br>
    Phone number: ${phoneNumber} <br>
    Time: ${time} <br>`,
});

export const getUserActivityEmail = ({ phoneNumber, time, userActivityList }: { phoneNumber: string, time: string, userActivityList: UserActivityData[] }): MailDataType => ({
  subject: `WebMaster - User Visit`,
  html: `
        <p>We're thrilled to share some exciting news about your website! 🌐</p>
       
        <p><strong>Current Number:</strong> <a href=tel:+91${phoneNumber}>${phoneNumber}</a></p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Total Visitors:</strong> ${userActivityList.length + 1}</p>

        <p><strong>List of Other Numbers</strong></p>
        <ol>
        ${userActivityList.map(({ phoneNumber: num }) => `<li><a href=tel:+91${num}>${num}</a></li>`).join("")}
        </ol>
    
        <p>Best regards,</p>
        <strong>The Webmaster Team</strong>
    `
});