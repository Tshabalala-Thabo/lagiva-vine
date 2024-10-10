import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminTableSkeletonLoader from '../../components/AdminTableSkeletonLoader';
import ProductModal from '../../components/ProductModal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => (product._id === updatedProduct._id ? updatedProduct : product))
    );
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(`/products/${productToDelete._id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productToDelete._id));
      closeDeleteModal();
    } catch (err) {
      setError('Failed to delete product. Please try again.');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    openModal();
  };

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl mb-4">Products</h2>
        <AdminTableSkeletonLoader />
      </div>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;

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
              <td className="border border-gray-300 p-2">${product.price}</td>
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
        <ProductModal
          onClose={closeModal}
          addProduct={addProduct}
          product={editingProduct}
          updateProduct={updateProduct}
        />
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeDeleteModal}>
          <div className="bg-white rounded-lg shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-end mt-4">
              <button onClick={deleteProduct} className="bg-red-500 text-white p-2 rounded mr-2">Delete</button>
              <button onClick={closeDeleteModal} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;