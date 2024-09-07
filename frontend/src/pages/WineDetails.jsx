import React from 'react';
import { useParams, Link } from 'react-router-dom';

const WineDetails = () => {
  const { id } = useParams();

  // Mock data (replace with actual data fetching)
  const wine = {
    id: 1,
    name: 'Red Blend',
    price: 25.99,
    image: 'path_to_image',
    description: 'A smooth red blend with notes of blackberry and vanilla.',
  };

  return (
    <div>
      <Link to="/wines" className="text-primary hover:underline mb-4 inline-block">&larr; Back to Wines</Link>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{wine.name}</h2>
        <img src={wine.image} alt={wine.name} className="w-full h-64 object-cover mb-4 rounded" />
        <p className="text-gray-700 mb-2">{wine.description}</p>
        <p className="text-primary font-bold">${wine.price}</p>
      </div>
    </div>
  );
};

export default WineDetails;