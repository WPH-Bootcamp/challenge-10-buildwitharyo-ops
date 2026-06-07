"use client";

import { useQuery } from "@tanstack/react-query";

import { getProfile } from "@/lib/api/auth";
import { getToken } from "@/lib/auth/token";
import { queryKeys } from "@/lib/query/keys";

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: getProfile,
    enabled: typeof window !== "undefined" && Boolean(getToken()),
    staleTime: 5 * 60 * 1000,
  });
}
