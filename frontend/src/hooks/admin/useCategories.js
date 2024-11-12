import { useEffect, useState } from 'react';
import { api } from '../../config/axiosConfig';

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data);
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
            const response = await api.post('/categories', category);
            setCategories((prevCategories) => [...prevCategories, response.data.category]);
            setError(null);
            return response.data.message;
        } catch (err) {
            setError('Failed to add category. Please try again.');
        }
    };

    const updateCategory = async (categoryId, category) => {
        try {
            const response = await api.put(`/categories/${categoryId}`, category);
            setCategories((prevCategories) =>
                prevCategories.map((cat) => (cat._id === categoryId ? response.data.category : cat))
            );
            setError(null);
            return response.data.message;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update category. Please try again.');
            return null;
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            const response = await api.delete(`/categories/${categoryId}`);
            setCategories((prevCategories) => prevCategories.filter(category => category._id !== categoryId));
            setError(null);
            return response.data.message;
        } catch (err) {
            setError('Failed to delete category. Please try again.');
        }
    };

    return { categories, error, setError, loading, addCategory, updateCategory, deleteCategory };
};

export default useCategories;
