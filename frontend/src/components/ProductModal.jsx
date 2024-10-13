import React, { useState } from 'react';
import useProducts from '../hooks/useProducts'; // Import the useProducts hook

const ProductModal = ({ onClose, product }) => {
  const [name, setName] = useState(product ? product.name : '');
  const [type, setType] = useState(product ? product.type : '');
  const [price, setPrice] = useState(product ? product.price : '');
  const [description, setDescription] = useState(product ? product.description : '');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  
  const { createProduct, updateProduct } = useProducts(); // Use the hook

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
        // If editing, call updateProduct
        await updateProduct(product._id, formData);
      } else {
        // If adding, call createProduct
        await createProduct(formData);
      }
      onClose(); // Close the modal after successful submission
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError('Failed to save product. Please try again.'); // Handle error
    }
  };

  return (
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">Save</button>
        <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
      </div>
    </form>
  );
};

export default ProductModal;
