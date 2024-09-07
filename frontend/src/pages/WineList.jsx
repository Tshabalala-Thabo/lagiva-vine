import React from 'react';
import { Link } from 'react-router-dom';

const WineList = () => {
  // Mock data (replace with actual data fetching)
  const wines = [
    { id: 1, name: 'Red Blend', price: 25.99, image: 'path_to_image' },
    { id: 2, name: 'Chardonnay', price: 22.99, image: 'path_to_image' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Wines</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wines.map((wine) => (
          <div key={wine.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/wines/${wine.id}`}>
              <img src={wine.image} alt={wine.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{wine.name}</h3>
                <p className="text-primary font-bold">${wine.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WineList;