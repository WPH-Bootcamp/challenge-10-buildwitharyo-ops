"use client";

import { useQuery } from "@tanstack/react-query";

import { getMyOrders } from "@/lib/api/order";
import { getToken } from "@/lib/auth/token";
import { queryKeys } from "@/lib/query/keys";
import type { OrderStatus } from "@/types/order";

export function useMyOrders(status?: OrderStatus) {
  return useQuery({
    queryKey: queryKeys.orders.list(status),
    queryFn: () => getMyOrders({ status, limit: 50 }),
    enabled: typeof window !== "undefined" && Boolean(getToken()),
  });
}
