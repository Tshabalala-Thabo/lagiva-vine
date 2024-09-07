import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WineDetails from './pages/WineDetails';
import Gallery from './pages/Gallery';
import Layout from './components/Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/wines/:id" element={<WineDetails />} />
          <Route path="/gallery" element={<Gallery />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;