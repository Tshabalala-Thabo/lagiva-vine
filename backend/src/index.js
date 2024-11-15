import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from '../src/config/db.js'
import productRoutes from '../src/routes/productRoutes.js'
import authRoutes from '../src/routes/authRoutes.js' // Import the Auth routes
import categoryRoutes from '../src/routes/categoryRoutes.js' // Import the Category routes
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB()

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the backend!!!')
})

// Use product routes
app.use('/api/products', productRoutes)

// Use auth routes
app.use('/api/auth', authRoutes) // Added auth routes

// Use category routes
app.use('/api/categories', categoryRoutes) // Added category routes

// Use user routes
app.use('/api/users', userRoutes);

// Use cart routes
app.use('/api/cart', cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})