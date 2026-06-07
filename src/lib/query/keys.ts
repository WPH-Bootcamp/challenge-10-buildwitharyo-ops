import type { RestaurantFilters } from "@/lib/api/resto";
import type { OrderStatus } from "@/types/order";

export const queryKeys = {
  profile: ["profile"] as const,

  restaurants: {
    all: ["restaurants"] as const,
    list: (filters: RestaurantFilters) =>
      ["restaurants", "list", filters] as const,
    detail: (id: number) => ["restaurants", "detail", id] as const,
    search: (query: string, page: number) =>
      ["restaurants", "search", query, page] as const,
    bestSeller: ["restaurants", "best-seller"] as const,
    recommended: ["restaurants", "recommended"] as const,
  },

  cart: ["cart"] as const,

  orders: {
    all: ["orders"] as const,
    list: (status?: OrderStatus) => ["orders", "list", status ?? "all"] as const,
  },
} as const;
