/**
 * ProtectedRoute Component
 * Redirects to /login if user is not authenticated.
 */
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
