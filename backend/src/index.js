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

// Enhanced logging middleware
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Request Headers:', JSON.stringify({
    origin: req.headers.origin,
    host: req.headers.host,
    referer: req.headers.referer
  }, null, 2));
  
  // Log environment variables for debugging
  console.log('Environment Configuration:');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
  
  next();
};

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Apply logger middleware early
app.use(loggerMiddleware);

// Middleware setup
app.use(cookieParser());
app.use(express.json());

// Comprehensive CORS configuration
const corsOptions = {
  origin: function(origin, callback) {
    // Allowed origins array
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'https://mrn-b453f.vercel.app',
      'http://localhost:3000',
      /\.vercel\.app$/  // Regex to match any Vercel deployment
    ];

    console.log('CORS Origin Check:', {
      origin,
      allowedOrigins,
      isAllowed: !origin || 
        allowedOrigins.some(allowed => 
          typeof allowed === 'string' 
            ? origin === allowed 
            : allowed.test(origin)
        )
    });

    // Check if origin is allowed
    if (!origin || 
        allowedOrigins.some(allowed => 
          typeof allowed === 'string' 
            ? origin === allowed 
            : allowed.test(origin)
        )
    ) {
      callback(null, true);
    } else {
      console.error('CORS blocked for origin:', origin);
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'CSRF-Token', 
    'X-Requested-With',
    'X-CSRF-Token',
    'Origin',
    'Accept'
  ],
  exposedHeaders: ['Set-Cookie', 'CSRF-Token'],
};

// Apply CORS
app.use(cors(corsOptions));

// Pre-flight handler
app.options('*', cors(corsOptions));

// CSRF protection middleware
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  },
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global Error Handler:');
  console.error('Error Name:', err.name);
  console.error('Error Message:', err.message);
  console.error('Full Error:', err);

  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    details: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
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
app.use('/api/auth', authRoutes);
app.get('/api/categories', categoryRoutes);

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

// Catch-all error logging for unhandled rejections and exceptions
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

export default app;

// Local development server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}