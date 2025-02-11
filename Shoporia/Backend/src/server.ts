import express, { Request, Response } from 'express';
import cors from 'cors';
import connectDB from './Controllers/DBController';
import { signup } from './Controllers/AuthControllers';

const app = express();
const port: number = 3000;
connectDB();

app.use(cors());
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.post('/signup', signup);

app.listen(port, () => {
    console.log(`Example app listening on port ${ port }`);
});
