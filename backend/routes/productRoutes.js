import express from 'express';
import multer from 'multer';
import path from 'path';
import Product from '../models/Product.js';
import { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

// Set up multer storage to include the original file extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Create a unique suffix
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Save the file with the original extension
  }
});

const upload = multer({ storage }); // Use the custom storage configuration

// Define routes
router.get('/', getAllProducts); // Get all products
router.post('/', upload.single('image'), async (req, res) => { // Use multer to handle image upload
  try {
    const newProduct = new Product(req.body);
    if (req.file) {
      newProduct.image = req.file.path; // Set the image path from the uploaded file
    }
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct); // Return the saved product
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});
router.get('/:id', getProductById); // Get a product by ID
router.put('/:id', upload.single('image'), updateProduct); // Use multer for updating product images
router.delete('/:id', deleteProduct); // Delete a product by ID

export default router;