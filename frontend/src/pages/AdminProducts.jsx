import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminTableSkeletonLoader from '../components/AdminTableSkeletonLoader'; // Import the new SkeletonLoader
import ProductModal from '../components/ProductModal'; // Import the ProductModal

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products'); // Adjust the endpoint as necessary
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
  };

  // Function to add a new product to the state
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]); // Ensure newProduct is complete
  };

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl mb-4">Products</h2>
        <AdminTableSkeletonLoader /> {/* Show skeleton loader while loading */}
      </div>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl mb-4">Products</h2>
      <button onClick={openModal} className="mb-4 bg-blue-500 text-white p-2 rounded">Add New Product</button> {/* Added button here */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}> {/* Ensure _id is unique */}
              <td className="border border-gray-300 p-2">{product._id}</td>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">${product.price}</td>
              <td className="border border-gray-300 p-2">{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <ProductModal onClose={closeModal} addProduct={addProduct} />} {/* Pass addProduct to modal */}
    </div>
  );
};

export default Products;