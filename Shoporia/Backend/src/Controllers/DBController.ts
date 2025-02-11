import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ShoporiaDB as string);
    console.log("Connected with the ShoporiaDB")
  }
  catch(err) {
    console.log("Cannot to the DB, ", err);
  }
}
