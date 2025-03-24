import express, { Request, Response } from 'express';
import cors from 'cors';
import connectDB from './Controllers/DBController';
import { signup, login } from './Controllers/AuthControllers';
import cookieParser from 'cookie-parser';
import { verifyToken } from './Controllers/AuthMiddleware';
import { details } from './Controllers/DetailsController';
import { updateDetails } from './Controllers/UpdateController';
import { createProduct, updateProduct } from './Controllers/ProductController';

const app = express();
const port: number = 3000;
connectDB();

app.use(cors({
    origin: "http://localhost:5173", // Ensure this matches your frontend URL
    credentials: true, // Allow sending cookies
    methods: ["GET", "POST", "PUT"], // Allow only required methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow required headers
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
app.post('/signup', signup);
app.post('/login', login);
app.get('/details', verifyToken, details);
app.put('/update', updateDetails);
app.post('/products', createProduct);
app.put('/products/:id', updateProduct);

app.listen(port, () => {
    console.log(`Shoporia app listening on port ${port}`);
});
