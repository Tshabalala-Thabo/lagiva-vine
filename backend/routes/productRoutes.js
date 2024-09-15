import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Define routes
router.get('/', getAllProducts); // Get all products
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct); // Return the saved product
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});
router.get('/:id', getProductById); // Get a product by ID
router.put('/:id', updateProduct); // Update a product by ID
router.delete('/:id', deleteProduct); // Delete a product by ID

export default router;