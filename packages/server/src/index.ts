import express, { Request, Response } from 'express';
import cors from 'cors';
import passport from './Auth/passport'; // The passport configuration file
import appRouter from './routes/appRouter';
import authRouter from './routes/authRouter';

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'], // allow to server to accept request from our react clients
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       // If origin is in the list of allowed origins or if it's undefined (for same-origin requests)
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   optionsSuccessStatus: 200,
// };

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
// Middleware to initialize Passport
app.use(passport.initialize());

app.use('/', appRouter);
app.use('/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the server!');
});

const PORT: number | string = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
