import { useAuthStore } from "@/context/auth/userStore";
import { SessionLoader } from "@/components/loaders/session-loader";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const AuthLoader = () => {
  const { checkSession, isLoading, hasChecked } = useAuthStore();

  useEffect(() => {
    if (!hasChecked) {
      checkSession();
    }
  }, [checkSession, hasChecked]);

  if (isLoading && !hasChecked) {
    return <SessionLoader />;
  }

  return <Outlet />;
};
