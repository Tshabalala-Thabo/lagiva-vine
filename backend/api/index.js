import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from '../src/config/db.js'
import productRoutes from '../src/routes/productRoutes.js'
import authRoutes from '../src/routes/authRoutes.js' // Import the Auth routes
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB()

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the backend!')
})

// Use product routes
app.use('/api/products', productRoutes)

// Use auth routes
app.use('/api/auth', authRoutes) // Added auth routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})