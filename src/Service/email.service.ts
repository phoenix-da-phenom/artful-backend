import "dotenv/config"
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host:process.env.SEND_EMAIL_HOST,
    port:Number(process.env.SEND_EMAIL_PORT),
    secure:true,
    auth:{
        user : process.env.SEND_EMAIL_USER,
        pass:process.env.SEND_EMAIL_PASSWORD
    },
})


export async function sendMail(from : string, to : string , subject: string , html: string ){
 const info = await transporter.sendMail({
        from: from,
        to: to,
        subject:subject,
        html:html
    });

   console.log("Message ID:", info.messageId);
console.log("Accepted:", info.accepted);
console.log("Rejected:", info.rejected);
console.log("Response:", info.response);
}