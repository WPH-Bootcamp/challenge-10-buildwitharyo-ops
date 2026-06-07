"use client";

import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/lib/api/cart";
import { getToken } from "@/lib/auth/token";
import { queryKeys } from "@/lib/query/keys";

export function useCart() {
  return useQuery({
    queryKey: queryKeys.cart,
    queryFn: getCart,
    enabled: typeof window !== "undefined" && Boolean(getToken()),
  });
}
