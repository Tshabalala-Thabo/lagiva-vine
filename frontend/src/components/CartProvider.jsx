import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../config/axiosConfig';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  
  // Remove cart from fetchCart dependency array to prevent infinite loop
  const fetchCart = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await api.get('/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, []); // Empty dependency array since we don't need any dependencies

  // Only fetch cart once on mount and when token changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCart();
    }
  }, [fetchCart]);

  // Update cart count when cart changes
  useEffect(() => {
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(totalCount);
  }, [cart]); // Only depend on cart changes

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

      setCart(response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  }, []); // No dependencies needed

  const clearCart = useCallback(() => {
    setCart([]);
    setCartItemCount(0);
  }, []);

  const value = {
    cart,
    cartItemCount,
    addItemToCart,
    fetchCart,
    clearCart
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