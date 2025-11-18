import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth, hasAnyRole } from "context/AuthContext";

function ProtectedRoute({ children, roles }) {
  const [{ user, isAuthenticated }] = useAuth();

  // If not authenticated, redirect to sign-in
  if (!isAuthenticated) {
    return <Navigate to="/authentication/sign-in" replace />;
  }

  // If roles are specified and user doesn't have required role, redirect to unauthorized
  if (roles && roles.length > 0 && !hasAnyRole(user, roles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
};

ProtectedRoute.defaultProps = {
  roles: [],
};

export default ProtectedRoute;
