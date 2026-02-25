import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

function getEnvVariable(key: string): string {
  const value = process.env[key];

  if (typeof value === "undefined") {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

const JWT_SECRET = getEnvVariable("JWT_SECRET");

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export const protect = (
  req: Request & { user?: string },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

const [, token] = authHeader.split(" ");

if (!token) {
  return res.status(401).json({ message: "Token missing" });
}

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      !("id" in decoded)
    ) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = (decoded as CustomJwtPayload).id;

    next();
  } catch {
    return res.status(401).json({ message: "Token invalid" });
  }
};