import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_APIKEY);

export async function sendMail(
  from: string,
  to: string,
  subject: string,
  html: string
) {
  console.log(`EMail will be sending to : ${to}`)
  try {
    const info = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    // Type guard: make sure info has a valid id
    if ("id" in info && typeof info.id === "string") {
      console.log("Email sent ID:", info.id);

      const status = await resend.emails.get(info.id); // safe now
      console.log("Delivery status:", status);

      return { info, status };
    } else {
      console.warn("Email was not accepted or has no ID:", info);
      return { info, status: null };
    }
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email failed to send!");
  }
}