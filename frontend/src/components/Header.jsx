import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/login'); // Redirect to login page
  };

  const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in
  const cartItemCount = 3; // Temporary indication of items in the cart

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
        <div className=" md:flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} className="text-gray-700 hover:text-primary" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                {cartItemCount}
              </span>
            )}
          </Link>
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
        className={`absolute top-full left-0 right-0 bg-white shadow-md md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-48' : 'max-h-0'
          }`}
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