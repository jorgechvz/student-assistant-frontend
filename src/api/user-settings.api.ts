import { axiosClient } from "./axios-client";
import type {
  UserProfileResponse,
  UpdateProfileRequest,
  ChangePasswordRequest,
  DeleteAccountRequest,
  IntegrationStatusResponse,
} from "@/types/user-settings.types";

const USER_ENDPOINTS = {
  PROFILE: "/user/profile",
  CHANGE_PASSWORD: "/user/change-password",
  DELETE_ACCOUNT: "/user/account",
  INTEGRATIONS: "/user/integrations",
  DISCONNECT_INTEGRATION: (integration: string) =>
    `/user/integrations/${integration}`,
} as const;

export async function getUserProfile(): Promise<UserProfileResponse> {
  const { data } = await axiosClient.get<UserProfileResponse>(
    USER_ENDPOINTS.PROFILE,
  );
  return data;
}

export async function updateUserProfile(
  request: UpdateProfileRequest,
): Promise<UserProfileResponse> {
  const { data } = await axiosClient.patch<UserProfileResponse>(
    USER_ENDPOINTS.PROFILE,
    request,
  );
  return data;
}

export async function changePassword(
  request: ChangePasswordRequest,
): Promise<{ message: string }> {
  const { data } = await axiosClient.post<{ message: string }>(
    USER_ENDPOINTS.CHANGE_PASSWORD,
    request,
  );
  return data;
}

export async function deleteAccount(
  request: DeleteAccountRequest,
): Promise<{ message: string }> {
  const { data } = await axiosClient.delete<{ message: string }>(
    USER_ENDPOINTS.DELETE_ACCOUNT,
    { data: request },
  );
  return data;
}

export async function getIntegrations(): Promise<IntegrationStatusResponse> {
  const { data } = await axiosClient.get<IntegrationStatusResponse>(
    USER_ENDPOINTS.INTEGRATIONS,
  );
  return data;
}

export async function disconnectIntegration(
  integration: string,
): Promise<{ message: string }> {
  const { data } = await axiosClient.delete<{ message: string }>(
    USER_ENDPOINTS.DISCONNECT_INTEGRATION(integration),
  );
  return data;
}
