import "dotenv/config"
import { Request, Response } from "express";
import { MagicLinTokenModel } from "../Models/magicLinkModel";
import crypto from "crypto";
import nodemailer from "nodemailer"
import { sendMail } from "../Service/email.service";
import { welcomeEmailTemplate } from "../Templates/WelcomeEmail";

export function registerUser(req: Request, res: Response) {
  console.log(req.body);
}

export async function magicLinkRegistration(req: Request, res: Response) {
  //get email
  const { email } = req.body;
  //Generate token (random token using crypto)
  const token = crypto.randomBytes(32).toString("hex");

  //set expiration to  1 hour
  const expiresAt = new Date(Date.now() + 3600 * 1000);
  //Store generated token in MongoDb
  await MagicLinTokenModel.create({
    email,
    token,
    expiresAt,
  });


  let from="onboarding@resend.dev"  //"onboarding@resend.dev"
  let subject="Welcome! Complete Registration"


  //send email
 await sendMail(from,email,subject,welcomeEmailTemplate(email))


  res.status(200).json({
    message: "Magic link sent!"
  })
}
