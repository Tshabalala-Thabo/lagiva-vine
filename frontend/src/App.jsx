import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WineDetails from './pages/WineDetails';
import Gallery from './pages/Gallery';
import Login from './pages/Login'; // Import Login page
import Register from './pages/Register'; // Import Register page
import AdminDashboard from './pages/admin/AdminDashboard'; // Import Admin Dashboard
import AdminLogin from './pages/admin/AdminLogin'; // Import Admin Login page
import AdminProducts from './pages/admin/AdminProducts'; // Import Admin Products page
import ProtectedRoute from './components/ProtectedRoute'; // Import Protected Route
import AdminLayout from './components/AdminLayout'; // Import Admin Layout
import Layout from './components/Layout'; // Import Layout for main routes
import CategoriesPage from './pages/CategoriesPage'; // Import the CategoriesPage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/wines/:id" element={<WineDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} /> {/* Add Login route */}
          <Route path="/register" element={<Register />} /> {/* Add Register route */}
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} /> {/* Admin Login route without Layout */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout /> {/* Use Admin Layout directly */}
            </ProtectedRoute>
          } 
        >
          <Route index element={<AdminDashboard />} /> {/* Admin Dashboard */}
          <Route path="products" element={<AdminProducts />} /> {/* Admin Products route */}
          <Route path="categories" element={<CategoriesPage />} /> {/* Categories Page route */}
          {/* Add more admin routes here */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;