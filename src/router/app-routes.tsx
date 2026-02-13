import { type RouteObject } from "react-router-dom";
import { Paths } from "./path.routes";
import { LoginPage } from "@/pages/auth/login";
import { SignupPage } from "@/pages/auth/singup";
import ProtectedRoute from "./protected-route/protected-route";
import { ConnectionPage } from "@/pages/connection/connection";
import PublicRoute from "./public-route/public-route";
import { ChatPage } from "@/pages/chat/chat";
import { AuthLoader } from "@/components/auth/auth-loader";
import { LandingPage } from "@/pages/landing/landing";
import { TermsOfServicePage } from "@/pages/legal/terms";
import { PrivacyPolicyPage } from "@/pages/legal/privacy";

export const AppRoutes: RouteObject[] = [
  {
    path: Paths.app.HOME,
    element: <LandingPage />,
  },
  {
    path: Paths.legal.TERMS,
    element: <TermsOfServicePage />,
  },
  {
    path: Paths.legal.PRIVACY,
    element: <PrivacyPolicyPage />,
  },
  {
    element: <AuthLoader />,
    children: [
      {
        element: <ProtectedRoute redirectTo={Paths.auth.LOGIN} />,
        children: [
          {
            path: Paths.app.CONNECTION,
            element: <ConnectionPage />,
          },
          {
            path: Paths.app.CHAT,
            element: <ChatPage />,
          },
          {
            path: Paths.app.CHAT_DETAIL,
            element: <ChatPage />,
          },
        ],
      },
      {
        element: <PublicRoute redirectTo={Paths.app.CHAT} />,
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
    ],
  },
];
