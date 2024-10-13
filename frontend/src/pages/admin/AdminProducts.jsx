import React, { useState } from 'react'
import { toast } from 'react-toastify' // Import toast
import AdminTableSkeletonLoader from '../../components/AdminTableSkeletonLoader'
import useProducts from '../../hooks/useProducts' // Import the useProducts hook
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal' // Import the ConfirmDeleteModal
import CreateModal from '../../components/CreateModal' // Import the CreateModal
import ToastNotifications from '../../components/ToastNotifications' // Import ToastNotifications

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const { products, isLoading, error: fetchError, deleteProduct, createProduct, updateProduct } = useProducts()

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const handleSubmit = async (formData) => {
    try {
      let message
      if (editingProduct) {
        // If editing, call updateProduct
        message = await updateProduct(editingProduct._id, formData)
      } else {
        // If adding, call createProduct
        message = await createProduct(formData)
      }
      toast.success(message) // Show success message
      closeModal() // Close the modal after successful submission
    } catch (err) {
      console.error(err) // Log the error for debugging
      toast.error(err.message) // Show error message
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    openModal()
  }

  const openDeleteModal = (product) => {
    setProductToDelete(product)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setProductToDelete(null)
  }

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      try {
        const message = await deleteProduct(productToDelete._id) // Call deleteProduct from the hook
        toast.success(message) // Show success message
      } catch (err) {
        toast.error(err.message) // Show error message
      }
      closeDeleteModal()
    }
  }

  if (isLoading) { // Update loading check
    return (
      <div>
        <h2 className="text-2xl mb-4">Products</h2>
        <AdminTableSkeletonLoader />
      </div>
    )
  }

  if (fetchError) return <p className="text-red-500">{fetchError}</p>

  const formFields = [
    { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Enter product name' },
    { name: 'type', label: 'Type', type: 'text', required: true, placeholder: 'Enter product type' },
    { name: 'price', label: 'Price', type: 'number', required: true, placeholder: 'Enter product price' },
    { name: 'description', label: 'Description', type: 'text', required: true, placeholder: 'Enter product description' },
    { name: 'image', label: 'Image', type: 'file', required: false, placeholder: '' },
  ]

  return (
    <div>
      <ToastNotifications /> {/* Include ToastNotifications component */}
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

      <CreateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formFields={formFields}
        heading={editingProduct ? 'Edit Product' : 'Add New Product'}
        initialData={editingProduct}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        heading="Confirm Deletion"
        description="Are you sure you want to delete this product?"
        onClose={closeDeleteModal}
        onConfirm={handleDeleteProduct}
      />
    </div>
  )
}

export default Products
