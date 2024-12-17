import React, { useState } from 'react';
import { useCart } from '../components/CartProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { ButtonPrimary, ButtonDangerOutline,Button, ButtonSecondaryOutline } from '@/components/Button';
import QuantitySelector from '../components/QuantitySelector';
import { ConfirmDeleteDialog } from '../components/Dialog';

const CartPage = () => {
    const { cart, cartItemCount, clearCart, updateItemQuantity, removeItemFromCart, updatingItems } = useCart();
    const navigate = useNavigate();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleClearCart = () => {
        clearCart();
    };

    const handleRemoveItem = (itemId) => {
        setItemToDelete(itemId);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            await removeItemFromCart(itemToDelete);
        } catch (error) {
            console.error('Failed to remove item:', error);
        } finally {
            setIsDeleteDialogOpen(false);
            setItemToDelete(null);
        }
    };

    const calculateTotalCost = () => {
        return cart.reduce((total, item) => total + item.productPrice * item.quantity, 0).toFixed(2);
    };

    const isUpdating = Object.values(updatingItems).some((updating) => updating);

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
                                        updateQuantity={updateItemQuantity}
                                        updatingItems={updatingItems}
                                    />
                                </div>
                                <ButtonDangerOutline
                                    className="inline-flex items-center justify-center rounded-[1px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background h-12 w-12 hover:bg-red-50 group"
                                    onClick={() => handleRemoveItem(item.itemId)}
                                    aria-label="Remove item"
                                    icon={<Trash2 className="h-8 w-8 text-red-500 group-hover:text-red-600 transition-colors" />}
                                />
                                </div>
                        ))}
                    </div>
                    <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded-[1px]">
                        <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
                        <p className="mb-2">Total Items: {cartItemCount}</p>
                        <p className="mb-4">Total Cost: R{calculateTotalCost()}</p>
                        <ButtonPrimary onClick={handleCheckout} className="bg-primary text-white px-4 py-2 rounded w-full" text={"Proceed to Checkout"} disabled={isUpdating} />
                        <ButtonSecondaryOutline onClick={handleClearCart} text={"Clear Cart"} className={"mt-2 w-full"} disabled={isUpdating} />
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
            <ConfirmDeleteDialog 
                isOpen={isDeleteDialogOpen}
                heading="Remove Item"
                text="Are you sure you want to remove this item from your cart?"
                onCancel={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default CartPage; 