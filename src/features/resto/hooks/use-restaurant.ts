"use client";

import { useQuery } from "@tanstack/react-query";

import { getRestaurant } from "@/lib/api/resto";
import { queryKeys } from "@/lib/query/keys";

export function useRestaurant(id: number) {
  return useQuery({
    queryKey: queryKeys.restaurants.detail(id),
    queryFn: () => getRestaurant(id, { limitMenu: 100, limitReview: 100 }),
    enabled: Number.isFinite(id) && id > 0,
  });
}
