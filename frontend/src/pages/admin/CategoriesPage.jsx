import React, { useEffect, useState } from 'react';
import useCategories from '../../hooks/useCategories'; // Updated import
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal'; // Import the delete modal component
import CreateModal from '../../components/CreateModal'; // Import the create/edit modal component
import { toast } from 'react-toastify'; // Import toast
import ToastNotifications from '../../components/ToastNotifications'; // Import the new ToastNotifications component

const CategoriesPage = () => {
    const { categories, error, loading, addCategory, updateCategory, deleteCategory } = useCategories(); // Use the custom hook to fetch categories
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal visibility
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for create/edit modal visibility
    const [categoryToDelete, setCategoryToDelete] = useState(null); // State to hold the category to delete
    const [categoryToEdit, setCategoryToEdit] = useState(null); // State to hold the category to edit

    const handleAddOrUpdateCategory = async (category) => {
        let message;
        if (categoryToEdit) {
            message = await updateCategory(categoryToEdit._id, category); // Update existing category
        } else {
            message = await addCategory(category); // Add new category
        }
        if (message) {
            toast.success(message); // Display success message
        } else {
            toast.error('An error occurred while processing your request.'); // Display generic error message
        }
        setIsCreateModalOpen(false); // Close the modal
        setCategoryToEdit(null); // Reset category to edit
    };

    const handleDelete = async () => {
        if (categoryToDelete) {
            const message = await deleteCategory(categoryToDelete); // Call the delete function from the hook
            if (message) {
                toast.success(message); // Display success message
            } else {
                toast.error('An error occurred while processing your request.'); // Display generic error message
            }
            setIsDeleteModalOpen(false); // Close the delete modal
            setCategoryToDelete(null); // Reset category to delete
        }
    };

    const formFields = [
        { name: 'name', label: 'Category Name', type: 'text', placeholder: 'Enter category name', required: true },
        { name: 'description', label: 'Description', type: 'text', placeholder: 'Enter description', required: false },
    ];

    return (
        <div>
            <h1>Categories</h1>
            <button
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => { setIsCreateModalOpen(true); setCategoryToEdit(null); }} // Open modal for adding
            >
                Add Category
            </button>
            {loading && <p>Loading categories...</p>}
            {error && <p>Error fetching categories: {error}</p>}
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

            {/* Confirmation Modal for Deletion */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                heading={"Confirm delete"}
                description={"Are you sure you want to delete this category?"}
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
            <ToastNotifications /> {/* Use the new ToastNotifications component */}
        </div>
    );
};

export default CategoriesPage;
