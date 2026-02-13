import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  deleteAccount,
  getIntegrations,
  disconnectIntegration,
} from "@/api/user-settings.api";
import type {
  UpdateProfileRequest,
  ChangePasswordRequest,
  DeleteAccountRequest,
} from "@/types/user-settings.types";
import { useAuthStore } from "@/context/auth/userStore";

export const userSettingsKeys = {
  all: ["user-settings"] as const,
  profile: () => [...userSettingsKeys.all, "profile"] as const,
  integrations: () => [...userSettingsKeys.all, "integrations"] as const,
} as const;

export function useUserProfile() {
  return useQuery({
    queryKey: userSettingsKeys.profile(),
    queryFn: getUserProfile,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: (request: UpdateProfileRequest) => updateUserProfile(request),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(userSettingsKeys.profile(), updatedProfile);

      setUser({
        id: updatedProfile.id,
        email: updatedProfile.email,
        full_name: updatedProfile.full_name,
        is_active: updatedProfile.is_active,
      });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (request: ChangePasswordRequest) => changePassword(request),
  });
}

export function useDeleteAccount() {
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: (request: DeleteAccountRequest) => deleteAccount(request),
    onSuccess: () => {
      logout();
    },
  });
}

export function useIntegrations() {
  return useQuery({
    queryKey: userSettingsKeys.integrations(),
    queryFn: getIntegrations,
    staleTime: 2 * 60 * 1000,
  });
}

export function useDisconnectIntegration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (integration: string) => disconnectIntegration(integration),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userSettingsKeys.integrations(),
      });
      queryClient.invalidateQueries({
        queryKey: userSettingsKeys.profile(),
      });
    },
  });
}
