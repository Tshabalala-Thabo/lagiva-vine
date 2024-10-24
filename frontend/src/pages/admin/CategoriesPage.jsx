import React, { useEffect, useState } from 'react';
import useCategories from '../../hooks/useCategories'; // Updated import
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal'; // Import the delete modal component
import CreateModal from '../../components/CreateModal'; // Import the create/edit modal component
import { toast } from 'react-toastify'; // Import toast
import ToastNotifications from '../../components/ToastNotifications'; // Import the new ToastNotifications component
import { BreadCrumb } from '../../components/BreadCrumb'; // Import the BreadCrumb component
import { Button } from "@/components/Button"; // Import the Button component
import { Plus } from "lucide-react"; // Import the Plus icon
import AdminTableSkeletonLoader from '../../components/AdminTableSkeletonLoader'; // Import the AdminTableSkeletonLoader

const CategoriesPage = () => {
    const { categories, error, setError, loading, addCategory, updateCategory, deleteCategory } = useCategories(); // Use the custom hook to fetch categories
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal visibility
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for create/edit modal visibility
    const [categoryToDelete, setCategoryToDelete] = useState(null); // State to hold the category to delete
    const [categoryToEdit, setCategoryToEdit] = useState(null); // State to hold the category to edit
    const [modalLoading, setModalLoading] = useState(false); // State for modal loading

    useEffect(() => {
        if (error) {
            toast.error(error); // Display error message as toast
            // Reset error state after displaying the toast
            setError(null); // Reset error state to allow for future error notifications
        }
    }, [error]); // Run effect when error changes

    const handleAddOrUpdateCategory = async (category) => {
        let message;
        if (categoryToEdit) {
            message = await updateCategory(categoryToEdit._id, category); // Update existing category
        } else {
            message = await addCategory(category); // Add new category
        }
        if (message) {
            toast.success(message); // Display success message
        }
        setIsCreateModalOpen(false); // Close the modal
        setCategoryToEdit(null); // Reset category to edit
    };

    const handleDelete = async () => {
        setModalLoading(true); // Set loading to true when starting deletion
        try {
            if (categoryToDelete) {
                const message = await deleteCategory(categoryToDelete); // Call the delete function from the hook
                if (message) {
                    toast.success(message); // Display success message
                }
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        } finally {
            setModalLoading(false); // Set loading to false after deletion
            setIsDeleteModalOpen(false); // Close modal after deletion
            setCategoryToDelete(null); // Reset category to delete
        }
    };

    const formFields = [
        { name: 'name', label: 'Category Name', type: 'text', placeholder: 'Enter category name', required: true },
        { name: 'description', label: 'Description', type: 'text', placeholder: 'Enter description', required: false },
    ];

    return (
        <div>
            <ToastNotifications /> {/* Include ToastNotifications component */}
            <div className='flex justify-between'>
                <div>
                    <BreadCrumb items={[ // Add this Breadcrumb component
                        { label: 'Home', href: '/' },
                        { label: 'Categories', isDropdown: false }
                    ]} />
                    <h1 className="text-2xl mb-4">Categories</h1>
                </div>
                <Button
                    text="Add Category"
                    onClick={() => { setIsCreateModalOpen(true); setCategoryToEdit(null); }} // Open modal for adding
                    className="mb-4 bg-green-500"
                    icon={<Plus className="h-4 w-4 mr-2" />} // Add the Plus icon here
                />
            </div>
            {loading ? (
                <AdminTableSkeletonLoader columns={3} /> // Pass the number of columns
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category._id}>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>
                                    <button onClick={() => { setIsCreateModalOpen(true); setCategoryToEdit(category); }}>Edit</button>
                                    <button onClick={() => { setIsDeleteModalOpen(true); setCategoryToDelete(category._id); }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Confirmation Modal for Deletion */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                heading={"Confirm delete"}
                description={"Are you sure you want to delete this category?"}
                loading={modalLoading}
            />

            {/* Create/Edit Modal */}
            <CreateModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleAddOrUpdateCategory}
                formFields={formFields} // Pass the dynamic form fields
                heading={categoryToEdit ? 'Edit Category' : 'Add New Category'} // Dynamic heading
                initialData={categoryToEdit} // Pass the current category data for editing
            />
        </div>
    );
};

export default CategoriesPage;
