import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  component: React.ComponentType;
  allowedRoles: string[];
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, allowedRoles, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={props => {
        if (!user) {
          // User is not logged in
          return <Redirect to="/login" />;
        }

        if (!allowedRoles.includes(user.role)) {
          // User role is not allowed
          return <Redirect to="/unauthorized" />;
        }

        // User is authenticated and has the right role
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;