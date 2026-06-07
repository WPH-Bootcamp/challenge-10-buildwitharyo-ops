import { api } from "./axios";
import type { ApiResponse } from "@/types/api";
import type {
  CheckoutPayload,
  Order,
  OrdersResult,
  OrderStatus,
} from "@/types/order";

export async function checkout(payload: CheckoutPayload) {
  const res = await api.post<ApiResponse<{ transaction: Order }>>(
    "/order/checkout",
    payload,
  );
  return res.data.data.transaction;
}

export async function getMyOrders(params?: {
  status?: OrderStatus;
  page?: number;
  limit?: number;
}) {
  const res = await api.get<ApiResponse<OrdersResult>>("/order/my-order", {
    params,
  });
  return res.data.data;
}
