import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WineDetails from './pages/WineDetails';
import Gallery from './pages/Gallery';
import Login from './pages/Login'; // Import Login page
import Register from './pages/Register'; // Import Register page
import AdminDashboard from './pages/AdminDashboard'; // Import Admin Dashboard
import AdminLogin from './pages/AdminLogin'; // Import Admin Login page
import ProtectedRoute from './components/ProtectedRoute'; // Import Protected Route
import AdminLayout from './components/AdminLayout'; // Import Admin Layout
import Layout from './components/Layout'; // Import Layout for main routes

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
          {/* Add more admin routes here */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;