import { create } from "zustand";
import { currentUser } from "@/api/auth.api";

export interface UserStorage {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
}

export type AuthStore = {
  user: UserStorage | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: UserStorage | null) => void;
  logout: () => void;
  checkSession: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user: UserStorage | null) => {
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    window.location.href = "/auth/login";
  },

  checkSession: async () => {
    set({ isLoading: true });
    try {
      const response = await currentUser();

      const userInfo: UserStorage = {
        id: response.id,
        email: response.email,
        full_name: response.full_name,
        is_active: response.is_active,
      };

      set({
        user: userInfo,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
