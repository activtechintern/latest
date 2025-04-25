
import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface PrivateRouteProps {
  children?: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-starthub-blue border-t-transparent"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to landing page
  if (!isAuthenticated) {
    return <Navigate to="/landing" replace />;
  }
  
  // If authenticated, render the protected route
  return children || <Outlet />;
};
