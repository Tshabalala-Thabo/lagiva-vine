import React, { useEffect, useState } from 'react';
import useFetchCategories from '../../hooks/useFetchCategories'; // Updated import
import axios from 'axios'; // Import axios
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal'; // Import the delete modal component
import CreateModal from '../../components/CreateModal'; // Import the create/edit modal component

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const { data, error } = useFetchCategories('/categories'); // Fetch categories from the backend
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal visibility
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for create/edit modal visibility
    const [categoryToDelete, setCategoryToDelete] = useState(null); // State to hold the category to delete
    const [categoryToEdit, setCategoryToEdit] = useState(null); // State to hold the category to edit

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);

    const handleAddOrUpdateCategory = async (category) => {
        try {
            let response;
            if (categoryToEdit) {
                // Update existing category
                response = await axios.put(`/categories/${categoryToEdit._id}`, category);
                setCategories(categories.map(cat => (cat._id === categoryToEdit._id ? response.data : cat))); // Update the category in the list
            } else {
                // Add new category
                response = await axios.post('/categories', category);
                setCategories([...categories, response.data]); // Update categories with the new category
            }
            setIsCreateModalOpen(false); // Close the modal
            setCategoryToEdit(null); // Reset category to edit
        } catch (error) {
            console.error('Error saving category:', error);
        }
    };

    const handleDelete = async () => {
        if (categoryToDelete) {
            try {
                await axios.delete(`/categories/${categoryToDelete}`); // Send DELETE request to the backend
                setCategories(categories.filter(category => category._id !== categoryToDelete)); // Update state to remove the deleted category
                setIsDeleteModalOpen(false); // Close the delete modal
                setCategoryToDelete(null); // Reset category to delete
            } catch (error) {
                console.error('Error deleting category:', error);
            }
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
            {error && <p>Error fetching categories: {error.message}</p>}
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
