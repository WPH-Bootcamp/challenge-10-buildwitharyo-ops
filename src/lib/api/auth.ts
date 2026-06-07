import { api } from "./axios";
import type { ApiResponse } from "@/types/api";
import type { AuthTokenResponse, User } from "@/types/user";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface UpdateProfileInput {
  name?: string;
  phone?: string;
}

export async function login(input: LoginInput) {
  const res = await api.post<ApiResponse<AuthTokenResponse>>(
    "/auth/login",
    input,
  );
  return res.data.data;
}

export async function register(input: RegisterInput) {
  const res = await api.post<ApiResponse<AuthTokenResponse>>(
    "/auth/register",
    input,
  );
  return res.data.data;
}

export async function getProfile() {
  const res = await api.get<ApiResponse<User>>("/auth/profile");
  return res.data.data;
}

export async function updateProfile(input: UpdateProfileInput) {
  const res = await api.put<ApiResponse<User>>("/auth/profile", input);
  return res.data.data;
}
