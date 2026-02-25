import "dotenv/config"
import jwt from "jsonwebtoken";

const JWT_SECRET= process.env.JWT_SECRET as string

if (!JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in environment variables");

}

export const generateToken = (userId: string)=> {
    return jwt.sign({
        id:userId
    }, JWT_SECRET, {
        expiresIn:"7d",
    });
}

export const verifyToken= (token:string)=> {
    return jwt.verify(token, JWT_SECRET);
}
