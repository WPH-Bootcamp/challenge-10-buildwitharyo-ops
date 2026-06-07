import type { OrderStatus } from "@/types/order";

export interface OrderStatusTab {
  value: OrderStatus;
  label: string;
}

export const ORDER_STATUS_TABS: OrderStatusTab[] = [
  { value: "preparing", label: "Preparing" },
  { value: "on_the_way", label: "On the Way" },
  { value: "delivered", label: "Delivered" },
  { value: "done", label: "Done" },
  { value: "cancelled", label: "Canceled" },
];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  preparing: "Preparing",
  on_the_way: "On the Way",
  delivered: "Delivered",
  done: "Done",
  cancelled: "Canceled",
};
