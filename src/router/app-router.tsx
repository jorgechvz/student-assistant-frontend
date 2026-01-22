import { useRoutes } from "react-router-dom";
import { AppRoutes } from "./app-routes";

export const AppRouter = () => {
  return useRoutes(AppRoutes);
};
