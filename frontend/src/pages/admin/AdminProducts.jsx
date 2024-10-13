import React, { useState } from 'react';
import AdminTableSkeletonLoader from '../../components/AdminTableSkeletonLoader';
import useProducts from '../../hooks/useProducts'; // Import the useProducts hook
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal'; // Import the ConfirmDeleteModal

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const { products, isLoading, error: fetchError, deleteProduct, createProduct, updateProduct } = useProducts(); // Use the useProducts hook

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setName('');
    setType('');
    setPrice('');
    setDescription('');
    setImage(null);
    setError(null);
  };

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
      if (editingProduct) {
        // If editing, call updateProduct
        await updateProduct(editingProduct._id, formData);
      } else {
        // If adding, call createProduct
        await createProduct(formData);
      }
      closeModal(); // Close the modal after successful submission
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError('Failed to save product. Please try again.'); // Handle error
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setType(product.type);
    setPrice(product.price);
    setDescription(product.description);
    setImage(null);
    openModal();
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleDeleteProduct = () => {
    if (productToDelete) {
      deleteProduct(productToDelete._id); // Call deleteProduct from the hook
      closeDeleteModal();
    }
  };

  if (isLoading) { // Update loading check
    return (
      <div>
        <h2 className="text-2xl mb-4">Products</h2>
        <AdminTableSkeletonLoader />
      </div>
    );
  }

  if (fetchError) return <p className="text-red-500">{fetchError}</p>;

  return (
    <div>
      <h2 className="text-2xl mb-4">Products</h2>
      <button onClick={openModal} className="mb-4 bg-blue-500 text-white p-2 rounded">Add New Product</button>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border border-gray-300 p-2 flex items-center">
                {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="w-10 h-10 mr-2" />} {/* Display image */}
                {product.name}
              </td>
              <td className="border border-gray-300 p-2">R{product.price}</td>
              <td className="border border-gray-300 p-2">{product.description}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(product)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
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
            <button type="button" onClick={closeModal} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
          </div>
        </form>
      )}

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        heading="Confirm Deletion"
        description="Are you sure you want to delete this product?"
        onClose={closeDeleteModal}
        onConfirm={handleDeleteProduct}
      />
    </div>
  );
};

export default Products;
