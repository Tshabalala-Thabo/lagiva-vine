import User from '../models/User.js';
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

// Add item to cart
export const addItemToCart = async (req, res) => {
  const { itemId, quantity } = req.body;
  try {
    // Get userId from JWT token (set by auth middleware)
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const existingItem = user.cart.find(item => item.itemId.toString() === itemId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ itemId, quantity });
    }

    await user.save();

    // Fetch product details for each item in the cart
    const cartWithDetails = await Promise.all(user.cart.map(async (item) => {
      const product = await Product.findById(item.itemId).select('name image price') // Fetch name, image, and price
      let imageUrl = null;
      if (product.image) {
        const command = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: product.image,
        });
        imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
      }
      return {
        itemId: item.itemId,
        quantity: item.quantity,
        productName: product.name,
        productImage: imageUrl, // Use the signed URL for the product image
        productPrice: product.price // Include product price
      }
    }));

    res.status(200).json(cartWithDetails); // Return updated cart with details
  } catch (err) {
    res.status(500).json({ message: 'Error adding item to cart', error: err.message });
  }
};

// Remove item from cart
export const removeItemFromCart = async (req, res) => {
  const { itemId } = req.body;
  try {
    // Get userId from JWT token (set by auth middleware)
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = user.cart.filter(item => item.itemId.toString() !== itemId);
    await user.save();
    
    // Return the ID of the removed item and a success message
    res.status(200).json({ message: 'Item removed successfully', itemId });
  } catch (err) {
    res.status(500).json({ message: 'Error removing item from cart', error: err.message });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  try {
    // Get userId from JWT token (set by auth middleware)
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Fetch product details for each item in the cart
    const cartWithDetails = await Promise.all(user.cart.map(async (item) => {
      const product = await Product.findById(item.itemId).select('name image price') // Fetch name, image, and price
      let imageUrl = null;
      if (product.image) {
        const command = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: product.image,
        });
        imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
      }
      return {
        itemId: item.itemId,
        quantity: item.quantity,
        productName: product.name,
        productImage: imageUrl, // Use the signed URL for the product image
        productPrice: product.price // Include product price
      }
    }));

    res.status(200).json(cartWithDetails);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving cart', error: err.message });
  }
};

// Update item quantity in cart
export const updateItemQuantity = async (req, res) => {
  const { itemId, quantity } = req.body;
  try {
    // Get userId from JWT token (set by auth middleware)
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const existingItem = user.cart.find(item => item.itemId.toString() === itemId);
    if (!existingItem) return res.status(404).json({ message: 'Item not found in cart' });

    existingItem.quantity = quantity; // Update the quantity
    await user.save();

    res.status(200).json({ message: 'Item quantity updated successfully', itemId, quantity });
  } catch (err) {
    res.status(500).json({ message: 'Error updating item quantity in cart', error: err.message });
  }
};

