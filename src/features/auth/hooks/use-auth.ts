"use client";

import { useEffect, useState } from "react";

import { getToken } from "@/lib/auth/token";
import { useProfile } from "./use-profile";

/**
 * Reads the current auth state for UI purposes. The `mounted` gate avoids a
 * hydration mismatch, since the token cookie is only readable on the client.
 */
export function useAuth() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const hasToken = mounted && Boolean(getToken());
  const { data: user, isLoading } = useProfile();

  return {
    mounted,
    user: user ?? null,
    isAuthenticated: hasToken && Boolean(user),
    isLoading: hasToken && isLoading,
  };
}
