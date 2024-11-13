import { useContext } from 'react';
import { CartContext } from '../components/CartProvider';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context; // Ensure this returns the latest cart state
};

