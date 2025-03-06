import { Request, Response } from 'express';
import { Customer } from '../Models/Customer';
import { Retailer } from '../Models/Retailer';

interface AuthRequest extends Request {
  user?: any; // Adding a custom 'user' field
}

export const details = async (req: AuthRequest, res: Response) => {
  console.log('Req has reached baby...');
  try {
    if (req.user === null) {
      res.status(200).json({ message: "Token unavailable" });
      return;
    }

    let userData;
    if (req.user.role === "customer") {
      userData = await Customer.findOne({ phone: req.user.phone });
    }
    if (req.user.role === "retailer") {
      userData = await Retailer.findOne({ phone: req.user.phone });
    }

    console.log('details: ', userData);
    console.log("Details sent.");
    res.status(200).json({user: userData});
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
