import express, { Request, Response } from 'express';
import cors from 'cors';
import connectDB from './Controllers/DBController';
import { signup } from './Controllers/AuthControllers';
import { adminSignup } from './Controllers/AuthControllers';
import { login } from './Controllers/AuthControllers';

const app = express();
const port: number = 3000;
connectDB();

app.use(cors());
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.post('/signup', signup);
app.post('/adminSignup', adminSignup);
app.post('/login', login);

app.listen(port, () => {
    console.log(`Example app listening on port ${ port }`);
});
