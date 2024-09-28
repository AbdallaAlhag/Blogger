import express, { Request, Response } from 'express';
import cors from 'cors';
const corsOptions = {
  origin: 'http://localhost:5173', // allow to server to accept request from our react clients
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = express();

app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the server!' });
  res.send('Hello from the server!');
});

const PORT: number | string = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
