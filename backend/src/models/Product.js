import mongoose from 'mongoose'

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    default: [],
  },
  published: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true }) // Add this option to include timestamps

// Create the model
const Product = mongoose.model('Product', productSchema)

export default Product
