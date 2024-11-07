import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from '../config/awsConfig.js'; // Import the S3 client
import { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getPublishedProducts } from '../controllers/productController.js';

const router = express.Router();

// Set up multer storage to use S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    // Remove the acl property
    key: (req, file, cb) => {
      cb(null, `products/${Date.now().toString()}-${file.originalname}`); // Set the file name
    },
  }),
});

// Define routes
router.get('/', getAllProducts); // Get all products
router.get('/published', getPublishedProducts); // Get all published products
router.post('/', upload.single('image'), addProduct); // Use multer to handle image upload
router.get('/:id', getProductById); // Get a product by ID
router.put('/:id', upload.single('image'), updateProduct); // Use multer for updating product images
router.delete('/:id', deleteProduct); // Delete a product by ID

export default router;