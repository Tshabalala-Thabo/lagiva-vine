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

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Adjust frontend URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CSRF protection setup
const csrfProtection = csrf({ cookie: true });

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

// CSRF token route
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Basic route
app.get('/', (req, res) => {
  res.send('Hi from the backend (src)!!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Something broke!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;