import mongoose from 'mongoose'

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // Store the path to the image
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
})

// Create the model
const Product = mongoose.model('Product', productSchema)

export default Product