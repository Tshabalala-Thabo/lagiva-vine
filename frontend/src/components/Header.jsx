import React from 'react';
import { Link } from 'react-router-dom';
import { Wine } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Wine className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold font-serif">Wine Elegance</span>
        </Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-sm font-medium hover:text-primary">Home</Link></li>
          <li><Link to="/gallery" className="text-sm font-medium hover:text-primary">Gallery</Link></li>
          {/* Add other navigation items as needed */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;