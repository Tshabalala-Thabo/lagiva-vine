import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import connectDB from '../src/config/db.js';
import productRoutes from '../src/routes/productRoutes.js';
import authRoutes from '../src/routes/authRoutes.js';
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
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://mrn-b453f.vercel.app',
      'https://mrn-b453-frontend-m5un77xnd-tshabalala-thabos-projects.vercel.app',
      'https://mrn-b453-frontend-git-main-tshabalala-thabos-projects.vercel.app',
      'http://localhost:3000',
      'http://localhost:5637'
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'CSRF-Token', 'X-Requested-With'],
  exposedHeaders: ['set-cookie', 'CSRF-Token']
};

app.use(cors(corsOptions));



// CSRF configuration
const csrfProtection = csrf({
  cookie: {
    key: '_csrf',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/'
  }
});

// Connect to MongoDB
connectDB();

// CSRF Token endpoint
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
  res.send('Hi from the backend!!');
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
