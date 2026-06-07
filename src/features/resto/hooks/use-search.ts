"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { searchRestaurants } from "@/lib/api/resto";
import { queryKeys } from "@/lib/query/keys";

export function useSearchRestaurants(query: string) {
  return useQuery({
    queryKey: queryKeys.restaurants.search(query, 1),
    queryFn: () => searchRestaurants({ q: query, limit: 24 }),
    enabled: query.length > 0,
    placeholderData: keepPreviousData,
  });
}
