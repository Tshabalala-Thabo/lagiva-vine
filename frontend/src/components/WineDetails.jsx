import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const WineDetails = ({ wines }) => {
  const { id } = useParams();
  const wine = wines.find(w => w.id === id);

  if (!wine) return <div>Wine not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">{wine.name}</h2>
      <img src={wine.image} alt={wine.name} className="w-full h-64 object-cover mb-4 rounded" />
      <p className="text-gray-700 mb-2">{wine.description}</p>
      <p className="text-primary font-bold">${wine.price}</p>
    </motion.div>
  );
};

export default WineDetails;