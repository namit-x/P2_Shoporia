import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  phn_num: { type: String, unique: true },
  email: { type: String, required: true },
  photo: {
    p_name: { type: String, required: false },
    data: { type: Buffer, required: false }, // Handles binary photo data
    content_type: { type: String, required: false }
  },
  role: { type: String, role: ['customer', 'admin'],required: true },
}, {discriminatorKey: 'role'});

export const User = mongoose.model('User', userSchema);
