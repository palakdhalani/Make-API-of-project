import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-5 text-center">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

        <Route
          path="/"
          element={user ? <Layout><Dashboard /></Layout> : <Navigate to="/login" />}
        />
        <Route
          path="/users"
          element={user ? <Layout><Users /></Layout> : <Navigate to="/login" />}
        />
        <Route
          path="/products"
          element={user ? <Layout><Products /></Layout> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
