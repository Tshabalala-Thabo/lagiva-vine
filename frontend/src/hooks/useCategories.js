import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/categories'); // Fetch categories from the backend
                setCategories(response.data); // Set the data from the response
            } catch (err) {
                setError('Failed to fetch categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const addCategory = async (category) => {
        try {
            const response = await axios.post('/categories', category); // Send POST request to add a new category
            setCategories((prevCategories) => [...prevCategories, response.data]); // Update state with the new category
        } catch (err) {
            setError('Failed to add category. Please try again.');
        }
    };

    const updateCategory = async (categoryId, category) => {
        try {
            const response = await axios.put(`/categories/${categoryId}`, category); // Send PUT request to update the category
            setCategories((prevCategories) =>
                prevCategories.map((cat) => (cat._id === categoryId ? response.data : cat))
            ); // Update the category in the state
        } catch (err) {
            setError('Failed to update category. Please try again.');
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            await axios.delete(`/categories/${categoryId}`); // Send DELETE request to the backend
            setCategories((prevCategories) => prevCategories.filter(category => category._id !== categoryId)); // Update state to remove the deleted category
        } catch (err) {
            setError('Failed to delete category. Please try again.');
        }
    };

    return { categories, error, loading, addCategory, updateCategory, deleteCategory }; // Return the functions
};

export default useCategories;
