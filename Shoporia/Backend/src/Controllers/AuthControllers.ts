import { Request, Response, NextFunction } from 'express';
import { Customer } from '../Models/Customer';
import { Admin } from '../Models/Admin'
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface data {
  name: string,
  password: string,
  phn_num: number,
  email: string,
  photo?: { p_name: string, data: Blob | File, content_type: string },
  total_orders: number,
  customer_address: string
}

interface loginData {

}

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export const signup = async (req: Request, res: Response) => {

  if (!req) {
    res.status(400).json({ message: "Request body not valid" });
  }
  let userData: data = req.body;
  let exists = await Customer.findOne({ phn_num: userData.phn_num }).exec();

  let hashedPassword = await bcrypt.hash(userData.password, 10);
  let userPass = userData.password;
  userData.password = hashedPassword;

  if (exists === null) {
    let newUser = new Customer(userData);
    await newUser.save();

    const payload = {
      name: newUser.name,
      password: userPass,
    }
    const secretKey = process.env.Secret_Key as string;
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    console.log(token);

    res.cookie('AuthToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "strict"
    })

    res.status(201).json({ message: "User Data saved." });
  }
  else {
    res.status(400).json({ message: "Entry already exists." });
  }
}

export const adminSignup = async (req: Request, res: Response) => {

  if (!req) {
    res.status(400).json({ message: "Request body not valid" });
  }
  let adminData: data = req.body;
  let exists = await Admin.findOne({ phn_num : adminData.phn_num }).exec();

  let hashedPassword = await bcrypt.hash(adminData.password, 10);
  let adminPass = adminData.password;
  adminData.password = hashedPassword;

  if (exists === null) {
    let newAdmin = new Admin(adminData);
    await newAdmin.save();

    const payload: JwtPayload = {
      name: newAdmin.name,
      password: adminPass,
    }
    const secretKey = process.env.Secret_Key as string;
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    // sending Authentication Token as a cookie only in the production environment.
    res.cookie('AuthToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "Production",
      sameSite: "strict",
      maxAge: 3600000,
    })

    res.status(201).json({ message: "Admin Data saved." });
  }
  else {
    res.status(400).json({ message: "Entry already exists." });
  }
}

// Middleware for authentication
const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token required" });

  let secretKey = process.env.Secret_Key as string;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded; // Attach user data to the request
    next();
  });
};

// Work on JWT and Admin Login. ===> DONE
// Use HttpOnly Cookies for Storing the Token. ===> DONE
// I didn't used the refresh tokens cause the access token will be stored into browser's cookies and also applied sameSite: "strict"

export const login = async (req: Request, res: Response) => {
  const data: data = req.body;

  const exists = await Customer.findOne({ phn_num: data?.phn_num }).exec();

  if (exists === null) {
    res.status(400).json({ message: "Account doesn't exists." });
  }
  else {
    if (data.password === exists.password) {
      res.status(200).json({ message: "Login" });
    }
  }
}