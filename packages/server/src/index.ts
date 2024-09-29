import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './routes/appRouter';

const corsOptions = {
  origin: 'http://localhost:5173', // allow to server to accept request from our react clients
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use('/', router);

// app.get('/api/posts', (req: Request, res: Response) => {
//   res.json({ posts });
// });
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the server!');
});

const PORT: number | string = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
