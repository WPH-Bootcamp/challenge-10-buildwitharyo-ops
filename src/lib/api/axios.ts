import axios, { AxiosError } from "axios";

import { clearToken, getToken } from "@/lib/auth/token";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      clearToken();
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string } | undefined;
    if (data?.message) {
      return data.message;
    }
  }
  return fallback;
}
