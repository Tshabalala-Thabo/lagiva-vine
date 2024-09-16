import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import Product from '../models/Product.js';
import { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Set up multer storage to use S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read', // Set the ACL for the uploaded files
    key: (req, file, cb) => {
      cb(null, `products/${Date.now().toString()}-${file.originalname}`); // Set the file name
    },
  }),
});

// Define routes
router.get('/', getAllProducts); // Get all products
router.post('/', upload.single('image'), async (req, res) => { // Use multer to handle image upload
  try {
    const newProduct = new Product(req.body);
    if (req.file) {
      newProduct.image = req.file.location; // Set the image URL from S3
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