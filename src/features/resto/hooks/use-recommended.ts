"use client";

import { useQuery } from "@tanstack/react-query";

import { getRecommended } from "@/lib/api/resto";
import { getToken } from "@/lib/auth/token";
import { queryKeys } from "@/lib/query/keys";

export function useRecommended(enabled = true) {
  return useQuery({
    queryKey: queryKeys.restaurants.recommended,
    queryFn: getRecommended,
    enabled: enabled && typeof window !== "undefined" && Boolean(getToken()),
  });
}
