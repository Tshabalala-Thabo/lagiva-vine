import express from 'express';
import {
  getAllProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// Define routes
router.get('/', getAllProducts); // Get all products
router.post('/', addProduct); // Add a new product
router.get('/:id', getProductById); // Get a product by ID
router.put('/:id', updateProduct); // Update a product by ID
router.delete('/:id', deleteProduct); // Delete a product by ID

export default router;