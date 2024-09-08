import React from 'react';

const ConnectWithUs: React.FC = () => {
  return (
    <div className="relative bg-cover bg-center py-16" style={{ backgroundImage: "url('/images/connect-background.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Connect With Us</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <a href="#" className="bg-primary hover:bg-primary-foreground text-white font-bold py-2 px-4 rounded transition duration-300">
            Facebook
          </a>
          <a href="#" className="bg-primary hover:bg-primary-foreground text-white font-bold py-2 px-4 rounded transition duration-300">
            Twitter
          </a>
          <a href="#" className="bg-primary hover:bg-primary-foreground text-white font-bold py-2 px-4 rounded transition duration-300">
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConnectWithUs;