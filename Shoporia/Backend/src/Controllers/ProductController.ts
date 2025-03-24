import { Request, Response, RequestHandler } from 'express';
import mongoose from 'mongoose';
import { Product } from '../Models/Product';

interface Image {
    p_name: string;
    data: Buffer;
    content_type: string;
}

interface Product {
    id: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: string;
    images: Image[];
    retailer_id: mongoose.Types.ObjectId;
    createdAt: Date;
}

let products: Product[] = [];

// Create a new product
export const createProduct: RequestHandler = async (req: Request, res: Response) => {
    try {
        const newProduct: Product = {
            id: new mongoose.Types.ObjectId(),
            createdAt: new Date(),
            ...req.body
        };

        products.push(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// Update an existing product
export const updateProduct: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const index = products.findIndex(p => p.id.equals(id));

        if (index === -1) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        products[index] = { ...products[index], ...req.body };
        res.json(products[index]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};
