// import { Request, Response } from "express";
// import { Customer } from "../Models/Customer";
// import { Retailer } from "../Models/Retailer";
// import { AuthRequest } from "./DetailsController";
// import multer from 'multer';
// import dotenv from 'dotenv';

// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// dotenv.config()

// interface UserPhoto {
//   data: string;
//   content_type: string;
// }

// interface CustomerData {
//   firstName: string;
//   lastName: string;
//   password: string;
//   phone: string;
//   email: string;
//   photo: UserPhoto;
//   total_orders: number;
//   customer_address: string;
//   role: string;
// }

// interface RetailerData {
//   firstName: string;
//   lastName: string;
//   password: string;
//   phone: string;
//   email: string;
//   role: string;
//   photo: UserPhoto;
//   total_products: number;
//   warehouse_address: string;
// }

// export const setImage = async (req: AuthRequest, res: Response) => {
//   console.log("Request reached.");
//   try {
//     if (req === null) {
//       res.status(400).json({ message: "Invalid request" });
//     }
//     const {buffer, mimetype} = req.user;

//     let userInfo: CustomerData | RetailerData | null;

//     if (data.role === 'customer') {
//       userInfo = await Customer.findByIdAndUpdate({ phone: data.phone }, {"photo.data": req.body.photo.data, "photo.content_type": req.body.photo.content_type}, {new : true} );
//     }
//     else {
//       userInfo = await Retailer.findByIdAndUpdate({ phone: data.phone }, {"photo.data": req.body.photo.data, "photo.content_type": req.body.photo.content_type}, {new : true} );

//     }
//     if (userInfo) {res.status(500).json({message: "Server Error"});}

//     console.log("User details updated: ", userInfo);
//     res.status(200).json({ message: "Photo updated successfully." });

    
//   }
//   catch (error) {
//     console.log('Error ocurred: ', error)
//   }
// }
