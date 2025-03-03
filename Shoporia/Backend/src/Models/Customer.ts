import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  photo: {
    p_name: { type: String, required: false },
    data: { type: Buffer, required: false }, // Handles binary photo data
    content_type: { type: String, required: false }
  },
  total_orders: { type: Number, required: false },
  customer_address: { type: String, required: false },
  role: { type: String, required: true },
});

export const Customer = mongoose.model('Customer', CustomerSchema);
