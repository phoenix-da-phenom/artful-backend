import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_APIKEY);

export async function sendMail(
  from: string,
  to: string,
  subject: string,
  html: string,
) {
  try {
    await resend.emails.send({
        from: from,
        to:to,
        subject:subject,
        html:html

    })


  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email failed to send!");
  }
}
