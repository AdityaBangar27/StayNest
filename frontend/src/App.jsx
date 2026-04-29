import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AddProperty from './pages/AddProperty';
import EditProperty from './pages/EditProperty';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/properties" element={
          <ProtectedRoute>
            <Properties />
          </ProtectedRoute>
        } />
        <Route path="/properties/:id" element={
          <ProtectedRoute>
            <PropertyDetails />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/add-property" element={
          <ProtectedRoute>
            <AddProperty />
          </ProtectedRoute>
        } />
        <Route path="/edit-property/:id" element={
          <ProtectedRoute>
            <EditProperty />
          </ProtectedRoute>
        } />
      </Routes>
      <Chatbot />
      <Footer />
    </Router>
  );
}

export default App;
