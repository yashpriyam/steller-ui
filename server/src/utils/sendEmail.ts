import nodemailer from "nodemailer";

export const sendEmail = async(messageObject: MailResponseType)=>{
    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SENDER_EMAIL, // generated ethereal user
                pass: process.env.SENDER_EMAIL_PASSWORD, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL, // sender address
           ...messageObject
        });
        
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error(error);
        return error;
    }
    
}
