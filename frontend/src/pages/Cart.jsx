import React from 'react';
import { useCart } from '../components/CartProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button, ButtonPrimary, ButtonDanger, ButtonSecondaryOutline } from '@/components/Button';
import QuantitySelector from '../components/QuantitySelector';

const CartPage = () => {
    const { cart, cartItemCount, clearCart,updateQuantity, removeItemFromCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleClearCart = () => {
        clearCart();
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await removeItemFromCart(itemId);
            console.log(cart);
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    };

    const calculateTotalCost = () => {
        return cart.reduce((total, item) => total + item.productPrice * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cartItemCount > 0 ? (
                <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
                    <div className="flex-grow space-y-4">
                        {cart.map((item) => (
                            <div key={item.itemId} className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 border-b pb-4">
                                <div className='flex'>
                                    <div className="flex items-center justify-center w-full md:w-20 h-20">
                                        <img
                                            src={item.productImage}
                                            alt={item.productName}
                                            className="w-full h-full object-contain rounded"
                                        />
                                    </div>
                                    <QuantitySelector
                                        itemId={item.itemId}
                                        initialQuantity={item.quantity}
                                        productName={item.productName}
                                        productPrice={item.productPrice}
                                        updateQuantity={updateQuantity}
                                    />
                                </div>
                                <ButtonDanger
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => handleRemoveItem(item.itemId)}
                                    icon={<Trash2 className="h-4 w-4" />}
                                    aria-label="Remove item"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded-[1px]">
                        <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
                        <p className="mb-2">Total Items: {cartItemCount}</p>
                        <p className="mb-4">Total Cost: R{calculateTotalCost()}</p>
                        <ButtonPrimary onClick={handleCheckout} className="bg-primary text-white px-4 py-2 rounded w-full" text={"Proceed to Checkout"} />
                        <ButtonSecondaryOutline onClick={handleClearCart} text={"Clear Cart"} className={"mt-2 w-full"} />
                    </div>
                </div>
            ) : (
                <div className="text-center flex flex-col items-center py-16">
                    <img src="/assets/illustrations/empty-animate.svg" alt="Empty Cart" className="mx-auto mb-4 max-w-xs h-auto" />
                    <p className="text-lg text-gray-500 mb-4">Oops, your cart is currently empty.</p>
                    <ButtonPrimary
                        text="Start Shopping"
                        onClick={() => navigate('/')}
                        className="hover:bg-primary-dark"
                    />
                </div>
            )}
        </div>
    );
};

export default CartPage; 