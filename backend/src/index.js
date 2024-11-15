// index.js or server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB first
connectDB();

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// Updated CORS configuration
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
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'CSRF-Token',
    'X-Requested-With'
  ],
  exposedHeaders: ['set-cookie']
};

app.use(cors(corsOptions));

// CSRF protection with updated cookie settings
const csrfProtection = csrf({
  cookie: {
    key: '_csrf',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined
  }
});

// Public routes (no CSRF needed)
app.use('/api/auth', authRoutes);
app.get('/api/products/published', async (req, res) => {
  try {
    const products = await Product.find({ isPublished: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching published products' });
  }
});

// CSRF Token endpoint
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Protected routes with CSRF
const protectedRoutes = express.Router();
protectedRoutes.use(csrfProtection);

// Apply routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      message: 'Invalid CSRF token. Please refresh and try again.'
    });
  }
  
  // Handle CORS errors
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      message: 'CORS error: Origin not allowed'
    });
  }

  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; // For Vercel deployment