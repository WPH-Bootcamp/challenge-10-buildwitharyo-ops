import { api } from "./axios";
import type { ApiResponse } from "@/types/api";
import type { CartResult } from "@/types/cart";

export interface AddToCartInput {
  restaurantId: number;
  menuId: number;
  quantity: number;
}

export async function getCart() {
  const res = await api.get<ApiResponse<CartResult>>("/cart");
  return res.data.data;
}

export async function addToCart(input: AddToCartInput) {
  const res = await api.post<ApiResponse<unknown>>("/cart", input);
  return res.data;
}

export async function updateCartItem(id: number, quantity: number) {
  const res = await api.put<ApiResponse<unknown>>(`/cart/${id}`, { quantity });
  return res.data;
}

export async function removeCartItem(id: number) {
  const res = await api.delete<ApiResponse<unknown>>(`/cart/${id}`);
  return res.data;
}

export async function clearCart() {
  const res = await api.delete<ApiResponse<unknown>>("/cart");
  return res.data;
}
