import { useAuthStore } from "@/context/auth/userStore";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface PublicRouteProps {
  redirectTo?: string;
  children?: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectTo = "/",
}) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (isAuthenticated) {
    // If the user was trying to reach a protected page before being sent to login,
    // redirect them there instead of the default.
    const intendedPath = (location.state as any)?.from?.pathname;
    const target = intendedPath || redirectTo;
    return <Navigate to={target} replace />;
  }

  return children ?? <Outlet />;
};

export default PublicRoute;
