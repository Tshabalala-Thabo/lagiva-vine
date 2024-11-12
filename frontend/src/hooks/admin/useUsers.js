import { useState, useCallback } from 'react';
import axiosInstance from '../../config/axiosConfig';

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axiosInstance.get('/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsers(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching users');
        } finally {
            setLoading(false);
        }
    }, []);

    const updateUser = async (userId, userData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.put(`/users/${userId}`, userData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            await fetchUsers(); // Refresh the users list
            return 'User updated successfully';
        } catch (err) {
            throw err.response?.data?.message || 'Error updating user';
        }
    };

    return {
        users,
        error,
        setError,
        loading,
        fetchUsers,
        updateUser
    };
};

export default useUsers; 