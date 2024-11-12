import { useEffect, useState, useCallback } from 'react';
import { api } from '../../config/axiosConfig';

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('jwtToken');
            const response = await api.get('/categories', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(response.data.data);
        } catch (err) {
            setError('Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const addCategory = async (category) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.post('/categories', category, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories((prevCategories) => [...prevCategories, response.data.data]);
            setError(null);
            return response.data.message;
        } catch (err) {
            setError('Failed to add category. Please try again.');
        }
    };

    const updateCategory = async (categoryId, category) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`/categories/${categoryId}`, category, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories((prevCategories) =>
                prevCategories.map((cat) => (cat._id === categoryId ? response.data.data : cat))
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
            const token = localStorage.getItem('token');
            const response = await api.delete(`/categories/${categoryId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
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
