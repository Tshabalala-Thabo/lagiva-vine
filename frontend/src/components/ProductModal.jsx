import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductModal = ({ onClose, addProduct, product, updateProduct }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // State for the image file
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      // If editing a product, populate the form with its data
      setName(product.name);
      setType(product.type);
      setPrice(product.price);
      setDescription(product.description);
      setImage(null); // Reset image when editing
    } else {
      // Reset form for adding a new product
      setName('');
      setType('');
      setPrice('');
      setDescription('');
      setImage(null); // Reset image for new product
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    const formData = new FormData(); // Create a FormData object
    formData.append('name', name);
    formData.append('type', type);
    formData.append('price', price);
    formData.append('description', description);
    if (image) {
      formData.append('image', image); // Append the image file if it exists
    }

    try {
      if (product) {
        // If editing, send PUT request
        const response = await axios.put(`/products/${product._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type for file upload
          },
        });
        updateProduct(response.data); // Update the product in the state
      } else {
        // If adding, send POST request
        const response = await axios.post('/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        addProduct(response.data); // Add the created product to the state
      }
      onClose(); // Close the modal after successful submission
    } catch (err) {
      console.error(err); // Log the error for debugging
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
          <label className="block mb-2">
            Image:
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])} // Set the image file
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