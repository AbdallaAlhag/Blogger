import express, { Request, Response } from 'express';
import cors from 'cors';
import prisma from './db/prisma';
import { errorHandler } from './middleware/errorHandler'; // Import your error handler
import passport from './Auth/passport'; // The passport configuration file
import appRouter from './routes/appRouter';
import authRouter from './routes/authRouter';
import path from 'path';
import dotenv from 'dotenv';
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';

dotenv.config({ path: envFile });

const publicAddress: string = process.env.VITE_PUBLIC_CLIENT_URL || '';
const privateAddress: string = process.env.VITE_PRIVATE_CLIENT_URL || '';
// const productionPublicAddress: string =
//   process.env.VITE_PUBLIC_CLIENT_URL || '';
// const productionPrivateAddress: string =
//   process.env.VITE_PRIVATE_CLIENT_URL || '';

console.log(`VITE_PUBLIC_CLIENT_URL: ${publicAddress}`);
console.log(`VITE_PRIVATE_CLIENT_URL: ${privateAddress}`);
// const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

// The following code is for handling graceful shutdowns of the server
// We use these events to disconnect from the database before the process exits
// This is important because Prisma will otherwise throw an error when the process
// is killed, as it will not be able to properly disconnect from the database.

// Handle SIGINT (e.g. Ctrl+C in the terminal)
process.on('SIGINT', async () => {
  console.log('Received SIGINT, disconnecting from database');
  await prisma.$disconnect();
  process.exit(0);
});

// Handle SIGTERM (e.g. kill command in the terminal)
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, disconnecting from database');
  await prisma.$disconnect();
  process.exit(0);
});

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        publicAddress,
        privateAddress,
        // productionPublicAddress,
        // productionPrivateAddress,
        'https://blogger-public.netlify.app',
        'https://blogger-private.netlify.app',
        'http://localhost:4173',
        'http://localhost:4174',
      ];
      console.log('Request origin:', origin);
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log('Origin not allowed:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    optionsSuccessStatus: 200,
  })
);
app.options('*', cors()); // Allow preflight requests for all routes

app.use(passport.initialize());
// Middleware to handle errors
app.use(errorHandler);
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

// __dirname wasn't working
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/', appRouter);
app.use('/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the server!');
});

const port: number | string = process.env.PORT ?? 3000;
// const API_URL = process.env.VITE_API_BASE_URL || "http://localhost:";

app.listen(Number(port), '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
