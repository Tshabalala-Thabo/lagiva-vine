import React, { useState, useMemo, useEffect } from 'react'
import { toast } from 'react-toastify' // Import toast
import AdminTableSkeletonLoader from '../../components/AdminTableSkeletonLoader'
import useProducts from '../../hooks/admin/useProducts' // Import the useProducts hook
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal' // Import the ConfirmDeleteModal
import { DynamicDialog } from '@/components/Dialog' // Import DynamicDialog
import ToastNotifications from '../../components/ToastNotifications' // Import ToastNotifications
import { DataTable } from '@/components/DataTable'
import { Button } from "@/components/Button"
import { MoreHorizontal, Pencil, Trash, Plus } from "lucide-react" // Add Plus to the imports
import { DynamicDropdown } from '@/components/DropDown'
import { BreadCrumb } from '../../components/BreadCrumb' // Add this import
import SubmitButton from '@/components/SubmitButton'
import CategorySelector from '../../components/CategorySelector' // Import the new CategorySelector component
import useCategories from '@/hooks/admin/useCategories'
const AdminProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalLoading, setIsModalLoading] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const { products, isLoading, error: fetchError, deleteProduct, createProduct, updateProduct } = useProducts()
  const { categories }= useCategories()
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    description: '',
    image: null,
    published: false,
  });
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        type: editingProduct.type || '',
        price: editingProduct.price || '',
        description: editingProduct.description || '',
        image: null,
        published: editingProduct.published || false,
      });
      setSelectedCategories(editingProduct.categories || []);
    } else {
      setFormData({
        name: '',
        type: '',
        price: '',
        description: '',
        image: null,
        published: false,
      });
      setSelectedCategories([]);
    }
  }, [editingProduct]);

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const trimmedData = {
      ...formData,
      image: formData.image ? formData.image : null, // Handle image upload separately
      categories: selectedCategories,
    };
    try {
      let message;
      setIsModalLoading(true)
      if (editingProduct) {
        message = await updateProduct(editingProduct._id, trimmedData);
      } else {
        message = await createProduct(trimmedData);
      }
      toast.success(message);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setIsModalLoading(false)
      closeModal();
    }
  };

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
      accessorKey: "published",
      header: "Published",
      cell: ({ row }) => (
        <div className={`px-2 py-1 rounded-full w-min text-xs font-medium ${row.getValue("published")
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
          }`}>
          {row.getValue("published") ? "Published" : "Draft"}
        </div>
      ),
    },
    {
      header: "Action",
      id: "actions",
      cell: ({ row }) => {
        const product = row.original

        const dropdownItems = [
          {
            label: "Edit",
            icon: Pencil,
            onClick: () => handleEdit(product)
          },
          {
            label: "Delete",
            icon: Trash,
            onClick: () => openDeleteModal(product)
          }
        ]

        const handleItemClick = (item) => {
          item.onClick()
        }

        return (
          <div className="text-right">
            <DynamicDropdown
              items={dropdownItems}
              onItemClick={handleItemClick}
              buttonText={<MoreHorizontal className="h-4 w-4" />}
            />
          </div>
        )
      },
    },
  ], [])

  if (isLoading) { // Update loading check
    return (
      <div>
        <h2 className="text-2xl mb-4">Products</h2>
        <AdminTableSkeletonLoader columns={5} />
      </div>
    )
  }

  if (fetchError) return <p className="text-red-500">{fetchError}</p>

  return (
    <div>
      <ToastNotifications /> {/* Include ToastNotifications component */}
      <div className='flex justify-between'>
        <div>
          <BreadCrumb items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Products', isDropdown: false }
          ]} />
          <h2 className="text-2xl mb-4 text-deep-blue">Manage Products</h2>
        </div>
        <Button
          text="Add product"
          onClick={openModal}
          className="mb-4 bg-primary-blue"
          icon={<Plus className="h-4 w-4 mr-2" />}
        />
      </div>

      <DataTable columns={columns} data={products} />

      <DynamicDialog
        isOpen={isModalOpen}
        onOpenChange={closeModal}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        footer={
          <div className="flex justify-end">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800 px-4 py-2 mr-2"
              onClick={closeModal}
            >
              Cancel
            </button>
            <SubmitButton onClick={handleSubmit} loading={isModalLoading} text="Save" width="w-20" />
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="flex flex-wrap">
          <div className="mb-4 w-full md:w-1/2 pr-2"> {/* Updated for responsiveness */}
            <label className="block mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              required
              placeholder="Enter product name"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4 w-full md:w-1/2 pr-2"> {/* Updated for responsiveness */}
            <label className="block mb-1" htmlFor="published">Published</label>
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="h-4 w-4 text-blue-600"
            />
          </div>
          {/* <div className="mb-4 w-full md:w-1/2 pr-2"> {/* Updated for responsiveness /}
            <label className="block mb-1" htmlFor="type">Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              required
              placeholder="Enter product type"
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="border p-2 w-full"
            />
          </div> */}

          <div className="mb-4  w-full md:w-1/2 pr-2"> {/* Updated for responsiveness */}
            <label className="block mb-1" htmlFor="description">Description</label>
            <textarea
              name="description"
              value={formData.description}
              required
              placeholder="Enter product description"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border p-2 w-full h-24"
            />
          </div>
          <div className="mb-4 w-full md:w-1/2 pr-2"> {/* Updated for responsiveness */}
            <label className="block mb-1" htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              required
              placeholder="Enter product price"
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4 w-full md:w-1/2 pr-2"> {/* Updated for responsiveness */}
            <label className="block mb-1" htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4 w-full md:w-1/2 pr-2"> {/* New category selection */}
            <label className="block mb-1">Categories</label>
            <CategorySelector
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />          
          </div>
        </form>
      </DynamicDialog>

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

export default AdminProducts
