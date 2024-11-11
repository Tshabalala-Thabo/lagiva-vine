import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import connectDB from '../src/config/db.js'
import productRoutes from '../src/routes/productRoutes.js'
import authRoutes from '../src/routes/authRoutes.js'
import categoryRoutes from '../src/routes/categoryRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware setup
app.use(cookieParser()) // Add cookie parser before other middleware

// Configure CORS with credentials
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Your React frontend URL
  credentials: true, // Important for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'CSRF-Token']
}))

app.use(express.json())

// CSRF protection middleware
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
  }
})

// Connect to MongoDB
connectDB()

// CSRF Token endpoint
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() })
})

// Apply CSRF protection to all routes that modify data
const protectedRoutes = express.Router()
protectedRoutes.use(csrfProtection)

// Routes that need CSRF protection
protectedRoutes.use('/api/products', productRoutes)
protectedRoutes.use('/api/categories', categoryRoutes)
protectedRoutes.use('/api/users', userRoutes)


// Public routes (no CSRF needed)
app.use('/api/auth', authRoutes) // Login/register don't need CSRF

// Apply the protected routes
app.use(protectedRoutes)

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from the backend!')
})

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      message: 'Invalid CSRF token. Please refresh the page and try again.'
    })
  }
  next(err)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})