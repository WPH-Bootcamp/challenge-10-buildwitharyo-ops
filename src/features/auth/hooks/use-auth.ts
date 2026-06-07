"use client";

import { getToken } from "@/lib/auth/token";
import { useHydrated } from "@/hooks/use-hydrated";
import { useProfile } from "./use-profile";

/**
 * Reads the current auth state for UI purposes. The hydration gate avoids a
 * mismatch, since the token cookie is only readable on the client.
 */
export function useAuth() {
  const hydrated = useHydrated();
  const hasToken = hydrated && Boolean(getToken());
  const { data: user, isLoading } = useProfile();

  return {
    mounted: hydrated,
    user: user ?? null,
    isAuthenticated: hasToken && Boolean(user),
    isLoading: hasToken && isLoading,
  };
}
