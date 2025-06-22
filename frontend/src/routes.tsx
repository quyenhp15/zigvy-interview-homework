import { Navigate, Outlet } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "./utils";

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
};

export const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
