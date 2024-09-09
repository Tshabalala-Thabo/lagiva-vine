import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Lagiva vinery. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;