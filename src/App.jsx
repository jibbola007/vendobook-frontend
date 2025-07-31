import React from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import Summary from './pages/Summary';
import ExpenseHistory from './pages/ExpenseHistory';
import EditExpense from './pages/EditExpense';
import ForgotPassword from './pages/ForgotPassword';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';

function AppContent() {
  const location = useLocation();
  const { user } = useAuth();

  const hideNavbarPaths = ['/login', '/signup', '/forgot-password'];
  const currentPath = location.pathname.toLowerCase();
  const shouldShowNavbar = !hideNavbarPaths.some(path => currentPath.startsWith(path));

  return (
    <div className="app-container">
      {shouldShowNavbar && <Navbar />}

      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute>
                <AddExpense />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <ExpenseHistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/summary"
            element={
              <PrivateRoute>
                <Summary />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditExpense />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default AppContent;