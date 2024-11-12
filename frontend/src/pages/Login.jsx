import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Import the custom hook

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, error, loading } = useAuth(); // Use the custom hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Call the login function
      navigate('/'); // Redirect to home
    } catch (error) {
      alert(error.message); // Show error message
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 flex items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="mt-4 text-center">
            <p className="text-sm">
              <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</a>
            </p>
            <p className="text-sm">
              Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
            </p>
          </div>
        </form>
      </div>
      <div className="flex-1 bg-cover bg-center hidden md:block" style={{ backgroundImage: 'url(/assets/hero_images/hero_2.png)' }} />
    </div>
  );
};

export default Login;