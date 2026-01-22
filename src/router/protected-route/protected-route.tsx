import { useAuthStore } from "@/context/auth/userStore";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  redirectTo?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/auth/login",
}) => {
  const location = useLocation();
  const { isLoading, isAuthenticated, checkSession } = useAuthStore();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      if (!hasChecked) {
        await checkSession();
        setHasChecked(true);
      }
    };
    verifySession();
  }, [checkSession, hasChecked]);

  if (isLoading || !hasChecked) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;
