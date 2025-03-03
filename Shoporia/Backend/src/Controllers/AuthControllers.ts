import { Request, Response } from 'express';
import { Customer } from '../Models/Customer';
import { Admin } from '../Models/Admin'
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface data {
  name: { firstName: string, lastName: string }, //combine these fname and lname into a single name field on the frontend.
  password: string,
  phone: number,
  email: string,
  role: string,
  photo?: { p_name: string, data: Blob | File, content_type: string },
}

interface Cdata extends data {
  total_products: number,
  customer_address: string,
}

interface Adata extends data {
  total_products: number,
  warehouse_address: string,
}

interface AuthRequest extends Request {
  user?: any; // Adding a custom 'user' field
}

interface loginData {
  password: string,
  phone: string,
  role: string,
}

export const signup = async (req: Request, res: Response): Promise<void> => {
  if (!req) {
    res.status(400).json({ message: "Request body not valid" });
    return;
  }

  if (req.body.role === 'customer') {

    let userData: Cdata = req.body;
    console.log("User Data recevied: ", userData)
    let exists = await Customer.findOne({ phone: userData.phone })
    
    if (exists !== null) {
      console.log("400 from customer column");
      res.status(400).json({ message: "Entry already exists." });
      return;
    }
    else {
      // Hash password before saving
      // await Customer.deleteMany({});
      userData.password = await bcrypt.hash(userData.password, 10);

      let newUser = new Customer(userData);
      await newUser.save();

      res.status(201).json({ message: "Operation Successful" });
      return;
    };
  }

  else if (req.body.role === 'admin') {
    let userData: Adata = req.body;
    let exists = await Admin.findOne({ phone: userData.phone }).exec();

    if (exists !== null) {
      console.log("400 from admin column");
      res.status(400).json({ message: "Entry already exists." });
      return;
    }
    else {
      // Hash password before saving
      // await Admin.deleteMany({});
      userData.password = await bcrypt.hash(userData.password, 10);

      let newUser = new Admin(userData);
      await newUser.save();

      res.status(201).json({ message: "Operation Successful" });
      return;
    };
  }
};

export const login = async (req: Request, res: Response) => {
  const data: loginData = req.body;
  console.log("data received: ", data);

  let exists;
  if (data.role === 'customer') {
    exists = await Customer.findOne({ phone: data.phone }).exec();
  }
  else {
    exists = await Admin.findOne({ phone: data.phone }).exec();
  }
  
  if (exists === null) {
    console.log(`Account doesn't exists: ${exists}`);
    res.status(400).json({ message: "Account doesn't exists." });
  }
  else {
    const isMatch: Boolean = await bcrypt.compare(data.password, exists.password);

    if (isMatch) {
      const payload = {
        phone: data.phone,
        role: data.role,
      }
      const secretKey = process.env.Secret_Key as string;
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
      // console.log(token);
      
      res.cookie('AuthToken', token, {
        httpOnly: false,
        secure: false, //change this to true in production.
        maxAge: 3600000,
        sameSite: "strict",
      })
      
      // console.log("Cookies Set:", res.getHeaders()["set-cookie"]);
      
      res.status(201).json({ message: "Verified" });
    }
    else {
      res.status(400).json({ message: "Not Authorized" });
    }
  }
}

export const homepage = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user === null) {
      res.status(200).json({ message: "Token unavailable" });
      return;
    }

    let userData;
    if(req.user.role === "customer") {
      userData = await Customer.findOne({phone : req.user.phone});
    }
    if(req.user.role === "admin") {
      userData = await Admin.findOne({phone : req.user.phone});
    }

    res.status(200).json({
      message: "Welcome to the homepage!",
      user: userData,
    });
  } catch (error) {
    console.error("Homepage error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Work on JWT and Admin Login. ===> DONE
// Use HttpOnly Cookies for Storing the Token. ===> DONE
// I didn't used the refresh tokens cause the access token will be stored into browser's cookies and also applied sameSite: "strict"