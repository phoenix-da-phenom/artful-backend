import "dotenv/config"
import { Request, Response } from "express";
import { MagicLinTokenModel } from "../Models/magicLinkModel";
import crypto from "crypto";
import nodemailer from "nodemailer"
import { sendMail } from "../Service/email.service";
import { welcomeEmailTemplate } from "../Templates/WelcomeEmail";
import { generateToken } from "../Utils/jwt";

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
  

  let from="onboarding@resend.dev"  //"onboarding@resend.dev"
  let subject="Welcome! Complete Registration"


  //send email
 await sendMail(from,email,subject,welcomeEmailTemplate(email,token))

 //Store generated token in MongoDb
  await MagicLinTokenModel.create({
    email,
    token,
    expiresAt,
  });



  res.status(200).json({
    message: "Magic link sent!"
  })
}

export async function loginUser(req:Request, res: Response){
  const {email, password}= req.body;
  //validate if user exist in database

  //Generate JWT token
  const token = generateToken("user_ID_HERE")
  //return responses
  res.status(200).json({
    success: true,
    token,
  })

} 

export async function verifyRegistration(req: Request, res:Response){
  const {token}= req.query;
  if (!token){
    return res.status(400).json({
      message: "Token missing"
    });
   

  }
   const magicLink = await MagicLinTokenModel.findOne({token});
   if (!magicLink){
    return res.status(400).json({
      message: "Invalid token"
    })
   }
   if (magicLink.expiresAt < new Date()){
    return res.status(400).json({message:"Token has expired"})
   }

   //token is valid here, log them in (e.g set session or JWT)
   //Example: req.session.user =magicLink.email

   //optionally, remove the token now that it's used

   await MagicLinTokenModel.deleteOne({
    token
   })
   res.status(200).json({message:"Authenticated successfully"})


}
