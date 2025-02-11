import { Request, Response } from 'express';
import { Customer } from '../Models/Customer';
import bcrypt from 'bcryptjs';

interface data {
  name: string,
  user_id: string,
  password: string,
  unique_id: string,
  email: string,
  photo?: { p_name: string, data: Blob | File, content_type: string },
  total_orders: number,
  customer_address: string
}

export const signup = async (req: Request, res: Response) => {

  if (!req) {
    res.status(400).json({ message: "Request body not valid" });
  }
  let userData: data = req.body;
  let exists = await Customer.findOne({ user_id: userData.password }).exec();

  let hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;

  if (exists === null) {
    let newUser = new Customer(userData);
    await newUser.save();
    res.status(200).json({ message: "Data saved." });
  }
  else {
    res.status(400).json({ message: "Entry already exists." });
  }
}
