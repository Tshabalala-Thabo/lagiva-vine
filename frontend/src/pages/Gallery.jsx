import React from 'react';
import { motion } from 'framer-motion';

const images = [
  { src: '/images/wine1.jpg', alt: 'Wine 1' },
  { src: '/images/wine2.jpg', alt: 'Wine 2' },
  { src: '/images/wine3.jpg', alt: 'Wine 3' },
  { src: '/images/wine4.jpg', alt: 'Wine 4' },
  { src: '/images/wine5.jpg', alt: 'Wine 5' },
  { src: '/images/wine6.jpg', alt: 'Wine 6' },
  { src: '/images/wine7.jpg', alt: 'Wine 7' },
  { src: '/images/wine8.jpg', alt: 'Wine 8' },
  // Add more images as needed
];

const Gallery = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Wine Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              style={{ aspectRatio: Math.random() > 0.5 ? '1 / 1' : '3 / 4' }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;