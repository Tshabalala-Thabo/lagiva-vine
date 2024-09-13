import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose' // Import mongoose
import connectDB from './config/db.js' // Import the connectDB function
import Product from './models/Product.js' // Import the Product model

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

// GET all products (wines)
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message })
  }
})

// POST a new product (wine)
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save()
    res.status(201).json(savedProduct)
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})