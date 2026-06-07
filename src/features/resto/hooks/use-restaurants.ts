"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getRestaurants, type RestaurantFilters } from "@/lib/api/resto";
import { queryKeys } from "@/lib/query/keys";

export function useRestaurants(
  filters: RestaurantFilters = {},
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: queryKeys.restaurants.list(filters),
    queryFn: () => getRestaurants(filters),
    placeholderData: keepPreviousData,
    enabled: options?.enabled ?? true,
  });
}
