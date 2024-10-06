import React, { useEffect, useState } from 'react';
import useFetchCategories from '../hooks/useFetchCategories'; // Updated import
import axios from 'axios'; // Import axios

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const { data, error } = useFetchCategories('/categories'); // Fetch categories from the backend

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/categories', newCategory); // Use axios to create a new category
            setCategories([...categories, response.data]); // Update categories with the new category
            setNewCategory({ name: '', description: '' }); // Reset form
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    return (
        <div>
            <h1>Categories</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={newCategory.name}
                    onChange={handleInputChange}
                    placeholder="Category Name"
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={newCategory.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                />
                <button type="submit">Add Category</button>
            </form>
            {error && <p>Error fetching categories: {error.message}</p>}
            <ul>
                {categories.map((category) => (
                    <li key={category._id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriesPage;