import User from '../models/User.js';

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
    res.status(200).json(user.cart);
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
    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ message: 'Error removing item from cart', error: err.message });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  try {
    // Get userId from JWT token (set by auth middleware)
    const userId = req.user.id;

    const user = await User.findById(userId).populate('cart.itemId');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving cart', error: err.message });
  }
};

