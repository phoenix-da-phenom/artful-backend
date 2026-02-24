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
    await transporter.sendMail({
        from: from,
        to: to,
        subject:subject,
        html:html
    })
}