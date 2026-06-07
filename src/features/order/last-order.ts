import type { Order } from "@/types/order";

export const LAST_ORDER_KEY = "foody:last-order";

export function readLastOrder(): Order | null {
  if (typeof window === "undefined") {
    return null;
  }
  const raw = sessionStorage.getItem(LAST_ORDER_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as Order;
  } catch {
    return null;
  }
}
