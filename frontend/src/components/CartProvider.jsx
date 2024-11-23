import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../config/axiosConfig';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  const fetchCart = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await api.get('/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Ensure cart data is always an array
      const cartData = Array.isArray(response.data) ? response.data : [];
      setCart(cartData);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart([]); // Reset to empty array on error
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCart();
    }
  }, [fetchCart]);

  useEffect(() => {
    const totalCount = cart.reduce((total, item) => total + (item?.quantity || 0), 0);
    setCartItemCount(totalCount);
  }, [cart]);

  useEffect(() => {
    console.log('Cart updated:', cart); // Log the cart whenever it changes
  }, [cart]);

  const addItemToCart = useCallback(async (itemId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await api.post(
        '/cart/add',
        { itemId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Ensure response data is an array
      const cartData = Array.isArray(response.data) ? response.data : [];
      setCart(prevCart => {
        const updatedCart = [...cartData]; // Update cart with the new data
        console.log('Cart updated:', updatedCart); // Log the updated cart
        return updatedCart;
      });
      return cartData;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  }, []);

  const removeItemFromCart = useCallback(async (itemId) => {
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

      // Use the removed item ID from the response
      const { itemId: removedItemId } = response.data;

      setCart(prevCart => {
        const updatedCart = prevCart.filter(item => item.itemId.toString() !== removedItemId);
        console.log('Cart updated:', updatedCart); // Log the updated cart
        return updatedCart;
      });
      return removedItemId; // Return the removed item ID
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    console.log('Cart cleared'); // Log when the cart is cleared
    setCartItemCount(0);
  }, []);

  const value = {
    cart,
    cartItemCount,
    addItemToCart,
    fetchCart,
    clearCart,
    removeItemFromCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};