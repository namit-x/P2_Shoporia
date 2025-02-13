import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  phn_num: { type: String, unique: true },
  email: { type: String, required: true },
  photo: {
    p_name: { type: String, required: false },
    data: { type: Buffer, required: false }, // Handles binary photo data
    content_type: { type: String, required: false }
  },
  total_orders: { type: Number, required: true },
  customer_address: { type: String, required: true }
});

export const Customer = mongoose.model('Customer', CustomerSchema);
