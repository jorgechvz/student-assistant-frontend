import type { LoginResponse } from "@/types/auth.types";
import { createContext } from "react";
import React from "react";

interface UserContextProps {
  user: LoginResponse | null;
  setUser: React.Dispatch<React.SetStateAction<LoginResponse | null>>;
}

export const UserContext = createContext<UserContextProps | null>(null);
