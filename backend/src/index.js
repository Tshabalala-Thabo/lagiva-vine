import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import connectDB from '../src/config/db.js';
import productRoutes from '../src/routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from '../src/routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cookieParser());
app.use(express.json());

// Configure CORS with credentials
// At the top of your file, after dotenv.config():
console.log('FRONTEND_URL:', process.env.FRONTEND_URL); // Debug log

// Replace your current CORS configuration with this:
app.use((req, res, next) => {
  console.log('Incoming request from origin:', req.headers.origin); // Debug log
  next();
});

app.use(
  cors({
    origin: function(origin, callback) {
      console.log('Checking origin:', origin); // Debug log
      console.log('Allowed origin:', process.env.FRONTEND_URL); // Debug log
      
      if (!origin || origin === process.env.FRONTEND_URL) {
        callback(null, true);
      } else {
        callback(new Error(`CORS not allowed for origin: ${origin}`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'CSRF-Token', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie', 'CSRF-Token'],
  })
);

// Add a CORS pre-flight handler for OPTIONS requests
app.options('*', cors());
// CSRF protection middleware
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
});

// Connect to MongoDB
connectDB();

// CSRF Token endpoint (publicly accessible)
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Routes that need CSRF protection
const protectedRoutes = express.Router();
protectedRoutes.use(csrfProtection);

// Apply protected routes
protectedRoutes.use('/api/products', productRoutes);
protectedRoutes.use('/api/categories', categoryRoutes);
protectedRoutes.use('/api/users', userRoutes);
protectedRoutes.use('/api/cart', cartRoutes);

// Public routes (no CSRF needed)
app.use('/api/auth', authRoutes); // Login/register don't need CSRF
app.get('/api/categories', categoryRoutes); // Public category route

// Apply the protected routes
app.use(protectedRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hi from the backend (src)!!');
});

// Error handling middleware for CSRF errors
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      message: 'Invalid CSRF token. Please refresh the page and try again.',
    });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
