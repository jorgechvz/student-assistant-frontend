import { type RouteObject } from "react-router-dom";
import { Paths } from "./path.routes";
import { LoginPage } from "@/pages/auth/login";
import { SignupPage } from "@/pages/auth/singup";
import ProtectedRoute from "./protected-route/protected-route";
import { ConnectionPage } from "@/pages/connection/connection";
import PublicRoute from "./public-route/public-route";

export const AppRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute redirectTo={Paths.auth.LOGIN} />,
    children: [
      {
        path: Paths.app.CONNECTION,
        children: [
          {
            index: true,
            element: <ConnectionPage />,
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute redirectTo={Paths.app.CONNECTION} />,
    children: [
      {
        path: Paths.auth.LOGIN,
        element: <LoginPage />,
      },
      {
        path: Paths.auth.SIGNUP,
        element: <SignupPage />,
      },
    ],
  },
  {
    path: Paths.NOT_FOUND,
    element: <div>404 - Page Not Found</div>,
  },
];
