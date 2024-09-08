import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wine, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const menuVariants = {
    closed: { x: "100%", opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Wine className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold font-frank-ruhl">Wine Elegance</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
            <Link to="/gallery" className="text-sm font-medium hover:text-primary">Gallery</Link>
            {/* Add other navigation items as needed */}
          </div>
          <button 
            className="md:hidden text-gray-500 hover:text-primary"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-40 md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center mb-8">
                <Link to="/" className="flex items-center space-x-2" onClick={toggleMenu}>
                  <Wine className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold font-frank-ruhl">Wine Elegance</span>
                </Link>
                <button 
                  className="text-gray-500 hover:text-primary"
                  onClick={toggleMenu}
                >
                  <X size={24} />
                </button>
              </div>
              <ul className="flex flex-col space-y-4">
                <li>
                  <Link 
                    to="/" 
                    className="block py-2 text-lg font-medium hover:text-primary"
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/gallery" 
                    className="block py-2 text-lg font-medium hover:text-primary"
                    onClick={toggleMenu}
                  >
                    Gallery
                  </Link>
                </li>
                {/* Add other navigation items as needed */}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;