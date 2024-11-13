"use client"

import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Users, Settings, BarChart, ShoppingBag, List, LogOut } from "lucide-react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-page-bg">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-deep-blue text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-center border-b border-gray-700">
          <h2 className="text-2xl font-semibold">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            <li>
              <Link to="/admin" className="flex items-center rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-700">
                <Home className="mr-3 h-6 w-6" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="flex items-center rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-700">
                <Users className="mr-3 h-6 w-6" />
                Manage Users
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className="flex items-center rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-700">
                <ShoppingBag className="mr-3 h-6 w-6" />
                Products
              </Link>
            </li>
            <li>
              <Link to="/admin/categories" className="flex items-center rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-700">
                <List className="mr-3 h-6 w-6" />
                Categories
              </Link>
            </li>
            <li>
              <Link to="/admin/settings" className="flex items-center rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-700">
                <Settings className="mr-3 h-6 w-6" />
                Settings
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="flex w-full items-center rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-700">
                <LogOut className="mr-3 h-6 w-6" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between bg-white px-6 shadow">
          <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <input
              type="search"
              placeholder="Search..."
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center">
            <button className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none">
              <span className="mr-2 text-sm">Admin User</span>
              <img
                className="h-8 w-8 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User avatar"
              />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-page-bg p-6">
          <Outlet /> {/* This will render the child routes */}
        </main>
      </div>

      {/* Overlay to close sidebar on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        >
          <button className="sr-only">Close sidebar</button>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
