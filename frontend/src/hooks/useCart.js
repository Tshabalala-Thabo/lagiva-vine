import { useContext } from 'react';
import CartContext from '../components/CartProvider';
import api from '../config/axiosConfig';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const { cart, cartItemCount, addItemToCart, fetchCart, clearCart } = context;

  // New function to remove an item from the cart
  const removeItemFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await api.post(
        '/cart/remove',
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optionally, you can update the cart state here if needed
      // fetchCart(); // Uncomment if you want to refetch the cart after removal

      return response.data; // Return the updated cart
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  };

  return {
    cart,
    cartItemCount,
    addItemToCart,
    fetchCart,
    clearCart,
    removeItemFromCart // Expose the new function
  };
};

