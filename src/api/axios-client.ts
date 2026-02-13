import axios from "axios";
import { refreshToken } from "./auth.api";

const API_URL = import.meta.env.VITE_API_URL;

let isRedirecting = false;
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const PUBLIC_PATHS_PREFIXES = [
  "/auth",
  "/about",
  "/contact",
  "/terms",
  "/privacy",
  "/",
];

const isPublicPath = () => {
  const currentPath = window.location.pathname;
  return PUBLIC_PATHS_PREFIXES.some((prefix) =>
    currentPath === "/"
      ? prefix === "/"
      : currentPath.startsWith(prefix) && prefix !== "/",
  );
};

const processQueue = (error: any, token: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (isPublicPath() && error.response?.status === 401) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/auth/refresh")) {
      if (!isRedirecting && !isPublicPath()) {
        isRedirecting = true;
        window.location.href = "/auth/login";
      }
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshToken();
        processQueue(null);
        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        if (!isRedirecting && !isPublicPath()) {
          isRedirecting = true;
          window.location.href = "/auth/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
