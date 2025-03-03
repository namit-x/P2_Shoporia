import { Request, Response, NextFunction,RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

// outside the function the console is working but not inside. error: "token required"

export const verifyToken: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {

  const token: string | undefined = req.cookies.AuthToken || req.headers.authorization?.split(" ")[1];
  console.log(`Here the request is received and token says: ${token}`);
  // console.log(`Token received: ${token}`);

  if (!token) {
    res.status(200).json({ error: "Token required" });
    return;
  }

  const secretKey = process.env.SECRET_KEY as string;
  if (!secretKey) {
    throw new Error("SECRET_KEY is not defined in environment variables");
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(403).json({ error: "Invalid token" });
      return;
    }

    (req as AuthenticatedRequest).user = decoded;
    next();
  });
};
