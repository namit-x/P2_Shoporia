import express, { Request, Response } from 'express';
import cors from 'cors';
import connectDB from './Controllers/DBController';
import { homepage, signup, login } from './Controllers/AuthControllers';
import cookieParser from 'cookie-parser';
import { verifyToken } from './Controllers/AuthMiddleware';

const app = express();
const port: number = 3000;
connectDB();

app.use(cors({
    origin: "http://localhost:5173", // Ensure this matches your frontend URL
    credentials: true, // Allow sending cookies
    methods: ["GET", "POST"], // Allow only required methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow required headers
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
app.post('/signup', signup);
app.post('/login', login);
app.get('/homepage', verifyToken, homepage);
// console.log("Request to verify token is sent.")

app.listen(port, () => {
    console.log(`Shoporia app listening on port ${port}`);
});
