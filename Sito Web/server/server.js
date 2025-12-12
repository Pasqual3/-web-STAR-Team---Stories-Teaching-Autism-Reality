// REAL IMPORT
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import cookieParser from 'cookie-parser';

// IMPORTED FROM FOLDERS
import { connectDB } from './config/mongoDbConnection.js';
import { authRouter } from './routes/authRoutes.js'
import userRouter from './routes/userRoute.js';
import storyRouter from './routes/storyRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl, mobile apps)
    if (!origin) return callback(null, true);

    // Allow all localhost origins for development
    if (origin && origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }

    // Allow specific production origins
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'https://mern-authentication-system-jw.vercel.app',
      'https://mern-authentication-system-using-jwt-and.vercel.app'
    ];

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Serve static files from mockImages folder
app.use('/mockImages', express.static('mockImages'));

// Api Endpoints
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
})
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/story', storyRouter);

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
}
)