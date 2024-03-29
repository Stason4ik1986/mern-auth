import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  // react-create-app will be the 'frontend/build' path
  app.use(express.static(path.join(__dirname, 'frontend/dist')));

  app.get((req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
} else {
  app.get('/', (req, res) => res.send('Server is ready'));
}

// Middlewares
app.use(notFound);
app.use(errorHandler);

// Start
app.listen(port, () => console.log(`Server started on port ${port}`));
