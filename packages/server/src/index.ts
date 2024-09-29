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

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
}
const posts: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with React',
    excerpt:
      'Learn the basics of React and start building your first component.',
    author: 'Jane Doe',
    date: '2023-09-15',
  },
  {
    id: 2,
    title: 'TypeScript: Why You Should Use It',
    excerpt: 'Discover the benefits of using TypeScript in your projects.',
    author: 'John Smith',
    date: '2023-09-20',
  },
  {
    id: 3,
    title: 'Tailwind CSS: A Utility-First CSS Framework',
    excerpt: 'Explore how Tailwind CSS can speed up your development process.',
    author: 'Alice Johnson',
    date: '2023-09-25',
  },
];

app.use('/', router);

app.get('/api/posts', (req: Request, res: Response) => {
  res.json({ posts });
});
app.get('/', (req: Request, res: Response) => {
  // res.json({ message: 'Hello from the server!' });
  res.send('Hello from the server!');
});

const PORT: number | string = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
