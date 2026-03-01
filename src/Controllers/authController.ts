import "dotenv/config"
import { Request, Response } from "express";
import { MagicLinTokenModel } from "../Models/magicLinkModel";
import crypto from "crypto";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendMail } from "../Service/email.service";
import { welcomeEmailTemplate } from "../Templates/WelcomeEmail";
import { generateToken } from "../Utils/jwt";
import { User } from "../Models/users";

export const registerUser = async(req:Request, res: Response): Promise<Response> =>{
    try{
      const {name , email , password}=req.body
      //check if input values are valid 
      if (!name || !email || !password){
        return res.status(400).json({
          success:false,
          message:"All fields are required"
        });
      }

      //check if user already exists
      const existingUser = await User.findOne({email});
      if (existingUser){
        return res.status(409).json({
          success:false,
          message:"User already exists",
        });
      }

      //Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt)

      //create user in the database
      const user = await User.create({
        name,
        email,
        password:hashedPassword
      })

      //generate JWT
      const token = jwt.sign(
        {
          id: user._id
        },
        process.env.JWT_SECRET as string ,
        {expiresIn: "7d"}
      )
      //return responses
      return res.status(201).json({
        success:true,
        message: "User create successfully",
        token,
        user:{
          id: user._id,
          name:user.name,
          email:user.email
        },

      });


    }catch(error){
      console.error("Signup error:" , error);

      return res.status(500).json({
        success:false,
        message:"Internal server error"
      })


    }


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
    token,
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
