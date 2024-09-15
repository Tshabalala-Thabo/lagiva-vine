import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductModal = ({ onClose, addProduct, product, updateProduct }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      // If editing a product, populate the form with its data
      setName(product.name);
      setType(product.type);
      setPrice(product.price);
      setDescription(product.description);
    } else {
      // Reset form for adding a new product
      setName('');
      setType('');
      setPrice('');
      setDescription('');
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      if (product) {
        // If editing, send PUT request
        const updatedProduct = { name, type, price, description };
        const response = await axios.put(`/api/products/${product._id}`, updatedProduct);
        updateProduct(response.data.product); // Update the product in the state
      } else {
        // If adding, send POST request
        const newProduct = { name, type, price, description };
        const response = await axios.post('/api/products', newProduct);
        addProduct(response.data.product); // Add the created product to the state
      }
      onClose(); // Close the modal after successful submission
    } catch (err) {
      setError('Failed to save product. Please try again.'); // Handle error
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl mb-4">{product ? 'Edit Product' : 'Add New Product'}</h2>
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