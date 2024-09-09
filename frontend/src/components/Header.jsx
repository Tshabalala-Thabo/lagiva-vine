import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="flex items-center">
            <img 
              src="/assets/logo/design.png" 
              alt="Wine Elegance Design" 
              className="h-8 w-auto mr-2 sm:h-9"
            />
            <img 
              src="/assets/logo/text.png" 
              alt="Wine Elegance Text" 
              className="h-8 ml-1 w-auto sm:h-6"
            />
          </div>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-gray-700 hover:text-primary">Home</Link></li>
            <li><Link to="/gallery" className="text-gray-700 hover:text-primary">Gallery</Link></li>
          </ul>
        </nav>
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div 
        className={`absolute top-full left-0 right-0 bg-white shadow-md md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-48' : 'max-h-0'
        }`}
      >
        <nav className="container mx-auto px-4 py-2">
          <ul className="space-y-2">
            <li><Link to="/" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/gallery" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>Gallery</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;