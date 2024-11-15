// api/index.js or your main entry file
import express from 'express';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import dotenv from 'dotenv';
import connectDB from '../src/config/db.js';
import productRoutes from '../src/routes/productRoutes.js';
import authRoutes from '../src/routes/authRoutes.js';
import categoryRoutes from '../src/routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

// CORS wrapper function for Vercel
const allowCors = fn => async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'https://mrn-b453f.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    return await fn(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CSRF protection middleware
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
  },
});

// Routes handler function
const handler = async (req, res) => {
  // Basic route
  app.get('/', (req, res) => {
    res.send('API is running');
  });

  // CSRF Token endpoint
  app.get('/api/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
  });

  // Public routes
  app.use('/api/auth', authRoutes);
  
  // Protected routes
  const protectedRoutes = express.Router();
  protectedRoutes.use(csrfProtection);
  
  app.use('/api/products', productRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/cart', cartRoutes);

  // Handle the request using Express
  return new Promise((resolve, reject) => {
    app(req, res, (error) => {
      if (error) reject(error);
      resolve();
    });
  });
};

// Export the wrapped handler
export default allowCors(handler);