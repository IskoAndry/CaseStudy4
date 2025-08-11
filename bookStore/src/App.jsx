import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUser } from './store/slices/authSlice';
import { USER_ROLES } from './utils/constants';
import Home from './pages/Home/Home';
import BookDetails from './pages/BookDetails/BookDetails';
import Admin from './pages/Admin/Admin';
import Auth from './pages/Auth/Auth';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);
  const isAdmin = currentUser?.role === USER_ROLES.ADMIN;

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route 
            path="/auth" 
            element={isAuthenticated ? <Navigate to="/" /> : <Auth />} 
          />

          {/* Protected admin route */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute isAllowed={isAdmin} redirectPath="/">
                <Admin />
              </ProtectedRoute>
            } 
          />

          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;