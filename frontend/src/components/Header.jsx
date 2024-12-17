import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from './CartProvider';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ButtonPrimary } from './Button';
import { Button } from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart = [], cartItemCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    clearCart();
    navigate('/login');
  };

  const handleViewCart = () => {
    setIsMenuOpen(false);
    navigate('/cart');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  // Calculate total cost only for valid items
  const totalCost = cart
    .filter(item => item && typeof item.productPrice === 'number' && typeof item.quantity === 'number')
    .reduce((total, item) => {
      return total + (item.productPrice * item.quantity);
    }, 0);

  const formattedTotalCost = isNaN(totalCost) ? '0.00' : totalCost.toFixed(2);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <Link to="/" className="flex items-center">
          <div className="flex items-center">
            <img
              src="/assets/logo/design.png"
              alt="Wine Elegance Design"
              className="h-8 w-auto mr-2 md:h-8"
            />
            <img
              src="/assets/logo/text.png"
              alt="Wine Elegance Text"
              className="h-6 w-auto md:h-6"
            />
          </div>
        </Link>
        <nav className="hidden md:flex justify-center flex-grow">
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-gray-700 hover:text-primary">Home</Link></li>
            <li><Link to="/gallery" className="text-gray-700 hover:text-primary">Gallery</Link></li>
          </ul>
        </nav>
        <div className="md:flex items-center space-x-4">
        <Popover>
            <PopoverTrigger asChild>
              <button
                variant="outline"
                size="icon"
                className="relative"
                aria-label="Shopping cart"
                onMouseEnter={() => setIsPopoverOpen(true)}
                onMouseLeave={() => setIsPopoverOpen(false)}
              >
                <ShoppingCart size={24} className="text-gray-700 hover:text-primary" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 -right-1 bg-red-500 text-white text-[10px] rounded-[1px] px-1">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 rounded-[1px] mr-4" onMouseEnter={() => setIsPopoverOpen(true)} onMouseLeave={() => setIsPopoverOpen(false)}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Recent Cart Items</h4>
                  <p className="text-sm text-muted-foreground">
                    Your most recent additions to the cart.
                  </p>
                </div>
                <ul className="grid gap-2">
                  {cart.length > 0 ? (
                    cart
                      .filter(item => item && item.productName && item.productPrice)
                      .slice(0, 3)
                      .map((item) => (
                        <li key={item.itemId} className="flex items-center space-x-2">
                          <img 
                            src={item.productImage} 
                            alt={item.productName} 
                            className="w-10 h-10 rounded object-contain"
                            onError={(e) => {
                              e.target.src = '/assets/placeholder.png'; // Fallback image
                            }}
                          />
                          <div className='flex w-full items-center justify-between'>
                            <div>
                              <p className="text-sm text-primary font-medium">{item.productName}</p>
                              <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
                            </div>
                            <p className='text-sm font-medium'>
                              R{Number(item.productPrice).toFixed(2)}
                            </p>
                          </div>
                        </li>
                      ))
                  ) : (
                    <li className="text-gray-500">No items in cart.</li>
                  )}
                </ul>
                <hr className="border-gray-300" />
                <p className="w-fill text-end font-medium">Total: R{formattedTotalCost}</p>
                <hr className="border-gray-300" />

                <div className="flex justify-between">
                  <ButtonPrimary 
                    text="Checkout" 
                    onClick={() => navigate('/checkout')}
                    disabled={cart.length === 0}
                  >
                    Checkout
                  </ButtonPrimary>
                  <Button 
                    className='text-primary border border-primary' 
                    text="View cart" 
                    variant="outline" 
                    onClick={handleViewCart}
                  >
                    View Cart
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="hidden md:block text-gray-700 hover:text-primary">Logout</button>
          ) : (
            <div className='flex hidden md:block space-x-4'>
              <Link to="/login" className="text-gray-700 hover:text-primary">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-primary">Register</Link>
            </div>
          )}
        </div>
      </div>
      <div
        className={`absolute top-full left-0 right-0 bg-white shadow-md md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-48' : 'max-h-0'}`}
      >
        <nav className="container mx-auto px-4 py-2">
          <ul className="space-y-2">
            <li><Link to="/" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/gallery" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>Gallery</Link></li>
            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout} className="block py-2 text-gray-700 hover:text-primary">Logout</button>
              </li>
            ) : (
              <>
                <li><Link to="/login" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>Login</Link></li>
                <li><Link to="/register" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;