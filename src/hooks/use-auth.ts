import { login, logout, signup } from "@/api/auth.api";
import { useAuthStore } from "@/context/auth/userStore";
import type { UserStorage } from "@/context/auth/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAuth = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  const fetchLogin = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      const userInfo: UserStorage = {
        id: data.user.id,
        email: data.user.email,
        full_name: data.user.full_name,
        is_active: data.user.is_active,
      };
      setUser(userInfo);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const handleSignUp = useMutation({
    mutationFn: async ({
      email,
      password,
      full_name,
    }: {
      email: string;
      password: string;
      full_name: string;
    }) => {
      return signup(email, password, full_name);
    },
    onSuccess: (data) => {
      const userInfo: UserStorage = {
        id: data.user.id,
        email: data.user.email,
        full_name: data.user.full_name,
        is_active: data.user.is_active,
      };
      setUser(userInfo);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUser(null);
      queryClient.clear();
    },
  });

  return { fetchLogin, handleSignUp, logoutMutation };
};

export default useAuth;
