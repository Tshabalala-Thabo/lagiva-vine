import React, { useState } from 'react';
import axios from 'axios';

const ProductModal = ({ onClose, addProduct }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const newProduct = { name, type, price, description };
      // Send POST request to create a new product
      const response = await axios.post('/api/products', newProduct); // Adjust the endpoint as necessary
      
      // Fetch the created product from the backend
      const createdProduct = response.data.product; // Assuming the backend returns the product in this format
      addProduct(createdProduct); // Add the created product to the state
      onClose(); // Close the modal after successful submission
    } catch (err) {
      setError('Failed to add product. Please try again.'); // Handle error
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl mb-4">Add New Product</h2>
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </label>
          <label className="block mb-2">
            Type:
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </label>
          <label className="block mb-2">
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </label>
          <label className="block mb-2">
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </label>
          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">Submit</button>
            <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;