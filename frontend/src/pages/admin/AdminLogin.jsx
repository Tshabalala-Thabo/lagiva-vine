import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; // Import the custom hook
import SubmitButton from '../../components/SubmitButton'; // Import the SubmitButton component
import { toast } from 'react-toastify'; // Import toast
import ToastNotifications from '../../components/ToastNotifications'; // Import the ToastNotifications component

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, error, loading } = useAuth(); // Use the custom hook
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const response = await login(email, password); // Call the login function
      const userRole = JSON.parse(atob(response.token.split('.')[1])).role; // Decode the JWT to get the role

      if (userRole === 'admin') {
        navigate('/admin'); // Redirect to admin dashboard if the user is an admin
      } else {
        alert('You do not have admin access.'); // Alert if not an admin
        localStorage.removeItem('token'); // Remove token if not admin
      }
    } catch (err) {
      toast.error(error); // Show error message as a toast
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <SubmitButton loading={submitLoading} text="Login" width="w-20" />
      </form>
      <ToastNotifications /> {/* Use the ToastNotifications component */}
    </div>
  );
};

export default AdminLogin;
