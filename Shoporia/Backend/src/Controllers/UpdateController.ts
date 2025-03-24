import { Request, Response } from 'express';
import { Customer } from '../Models/Customer';
import { Retailer } from '../Models/Retailer';

export const updateDetails = async (req: Request, res: Response) => {
  const {phone, role, ...updateData} = req.body;
  let beforeUpdate;

  if (role === "customer") {
    console.log("Updating customer details");
    beforeUpdate = await Customer.findOneAndUpdate(
      { phone: phone },
      { $set: updateData }, // Only update other fields
      { new: true, runValidators: true }
  );
  }
  else if (role === "retailer") {
    beforeUpdate = await Retailer.findOneAndUpdate(
      { phone: phone },
      { $set: updateData }, // Only update other fields
      { new: true, runValidators: true }
  );
  }

  res.send({message: "Details Updated"});
}
