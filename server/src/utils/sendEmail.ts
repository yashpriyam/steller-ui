import nodemailer from "nodemailer";

export const sendEmail = async(messageObject: MailResponseType): Promise<string | unknown> =>{
    try {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SENDER_EMAIL, // generated ethereal user
                pass: process.env.SENDER_PASSWORD, // generated ethereal password
            },
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL, // sender address
           ...messageObject
        });

        console.log("Message sent: %s", info.messageId);
        return info.messageId;
    } catch (error) {
        console.error(error);
        return error;
    }

}
