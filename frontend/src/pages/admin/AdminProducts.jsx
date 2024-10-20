import React, { useState, useMemo } from 'react'
import { toast } from 'react-toastify' // Import toast
import AdminTableSkeletonLoader from '../../components/AdminTableSkeletonLoader'
import useProducts from '../../hooks/useProducts' // Import the useProducts hook
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal' // Import the ConfirmDeleteModal
import CreateModal from '../../components/CreateModal' // Import the CreateModal
import ToastNotifications from '../../components/ToastNotifications' // Import ToastNotifications
import { DataTable } from '@/components/DataTable'
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

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

  const columns = useMemo(() => [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center">
          {row.original.imageUrl && (
            <img src={row.original.imageUrl} alt={row.original.name} className="w-10 h-10 mr-2" />
          )}
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <div>R{row.getValue("price")}</div>,
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original
        return (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(product)}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openDeleteModal(product)}
            >
              Delete
            </Button>
          </div>
        )
      },
    },
  ], [])

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
      <Button onClick={openModal} className="mb-4">Add New Product</Button>
      
      <DataTable columns={columns} data={products} />

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
