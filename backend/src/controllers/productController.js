import Product from '../models/Product.js';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithImageUrl = await Promise.all(products.map(async (product) => {
      let imageUrl = null;
      if (product.image) {
        const command = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: product.image, // This should be the key stored in the database
        });
        imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // URL valid for 1 hour
      }
      return {
        ...product.toObject(),
        imageUrl,
      };
    }));
    res.status(200).json(productsWithImageUrl);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Add a new product
export const addProduct = async (req, res) => {
  const { name, type, price, description } = req.body;
  const image = req.file ? req.file.key : null; // Get the image key from S3
  try {
    const newProduct = new Product({ name, type, price, image, description });
    const savedProduct = await newProduct.save();
    res.status(200).json({ message: 'Product added successfully', product: savedProduct }); // Return success message and the saved product
  } catch (error) {
    res.status(400).json({ message: 'Error adding product: ' + error.message }); // Return specific error message
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body }; // Get the update data from the request body

    // Check if a new image is uploaded
    if (req.file) {
      updateData.image = req.file.key; // Update the image key if a new image is uploaded
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product: ' + error.message }); // Return specific error message
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product: ' + error.message }); // Return specific error message
  }
};
