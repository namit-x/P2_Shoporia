import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    admin_id: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phn_num: { type: String, unique: true },
    email: { type: String, required: true },
    photo: {
        p_name: { type: String, required: false },
        data: { type: Buffer, required: false }, // Handles binary photo data
        content_type: { type: String, required: false }
    },
    total_products: { type: Number, required: true },
    warehouse_address: { type: String, required: true }
});

export const Admin = mongoose.model('Admin', adminSchema);
