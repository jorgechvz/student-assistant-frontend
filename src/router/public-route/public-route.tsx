import { useAuthStore } from "@/context/auth/userStore";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PublicRouteProps {
  redirectTo?: string;
  children?: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectTo = "/connection",
}) => {
  const { isAuthenticated, isLoading, checkSession } = useAuthStore();
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

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ?? <Outlet />;
};

export default PublicRoute;
