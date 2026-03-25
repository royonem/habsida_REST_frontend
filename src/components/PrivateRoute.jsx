import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const roles = localStorage.getItem("roles");

  const allowed = Array.isArray(requiredRole)
    ? requiredRole.some(r => roles.includes(r))
    : roles.includes(requiredRole);

  if (!token) return <Navigate to="/login" replace />;
  if (!allowed) return <Navigate to="/user" replace />;

  return children;
}