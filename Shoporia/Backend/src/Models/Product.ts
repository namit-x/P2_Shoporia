import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  image: string;
  description: string;
  id: string;
  quantity_avail: number;
  out_of_stock: boolean;
  price: number;
  ratings: number;
  category: string;
  sub_categories: string[];
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  quantity_avail: { type: Number, required: true },
  out_of_stock: { type: Boolean, default: false },
  price: { type: Number, required: true },
  ratings: { type: Number, required: true, min: 0, max: 5 },
  category: { type: String, required: true },
  sub_categories: { type: [String], required: true },
});

// Auto-set `out_of_stock` based on `quantity_avail`
ProductSchema.pre("save", function (next) {
  this.out_of_stock = this.quantity_avail === 0;
  next();
});

// Export as ES module
const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
