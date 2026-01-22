import type {
  LoginResponse,
  SignUpResponse,
  UserResponse,
} from "@/types/auth.types";
import axios from "axios";
import { axiosClient } from "./axios-client";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string) => {
  const response = await axiosClient.post<LoginResponse>(`/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const signup = async (
  email: string,
  password: string,
  full_name: string,
) => {
  const response = await axiosClient.post<SignUpResponse>(`/auth/signup`, {
    email,
    password,
    full_name,
  });
  return response.data;
};

export const currentUser = async () => {
  const response = await axiosClient.get<UserResponse>(`/auth/me`);
  return response.data;
};

export const logout = async () => {
  await axiosClient.post(`/auth/logout`, {});
};

export const refreshToken = async () => {
  const response = await axios.post<{ access_token: string }>(
    `${API_URL}/auth/refresh`,
    {},
    { withCredentials: true },
  );
  return response.data.access_token;
};
