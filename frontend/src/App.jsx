import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WineDetails from './pages/WineDetails';
import Gallery from './pages/Gallery';
import Layout from './components/Layout';
import Login from './pages/Login'; // Import Login page
import Register from './pages/Register'; // Import Register page

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
      </Routes>
    </Router>
  );
};

export default App;