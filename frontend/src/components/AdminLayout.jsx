import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/admin/login'); // Redirect to admin login page
  };

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white h-screen p-4">
        <h2 className="text-2xl mb-4">Admin Panel</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <Link to="/admin" className="hover:underline">Dashboard</Link>
            </li>
            <li className="mb-2">
              <Link to="/admin/users" className="hover:underline">Manage Users</Link>
            </li>
            <li className="mb-2">
              <Link to="/admin/settings" className="hover:underline">Settings</Link>
            </li>
            <li className="mb-2">
              <Link to="/admin/products" className="hover:underline">Products</Link> {/* Link to Admin Products */}
            </li>
            <li className="mb-2">
              <Link to="/admin/categories" className="hover:underline">Categories</Link> {/* Link to Admin Products */}
            </li>
            <li className="mb-2">
              <button onClick={handleLogout} className="hover:underline text-white">Logout</button>
            </li>
            {/* Add more admin links as needed */}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <Outlet /> {/* This will render the child routes */}
      </main>
    </div>
  );
};

export default AdminLayout;