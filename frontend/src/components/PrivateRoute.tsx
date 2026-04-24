import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function PrivateRoute() {
  const { user, loading } = useAuth();
  if(loading) {
      return;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
