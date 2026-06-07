import { api } from "./axios";
import type { ApiResponse } from "@/types/api";
import type {
  RestaurantCardData,
  RestaurantDetail,
  RestaurantListResult,
} from "@/types/resto";

export interface RestaurantFilters {
  location?: string;
  range?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  category?: string;
  page?: number;
  limit?: number;
}

export async function getRestaurants(filters: RestaurantFilters = {}) {
  const res = await api.get<ApiResponse<RestaurantListResult>>("/resto", {
    params: filters,
  });
  return res.data.data;
}

export async function getRestaurant(
  id: number,
  options?: { limitMenu?: number; limitReview?: number },
) {
  const res = await api.get<ApiResponse<RestaurantDetail>>(`/resto/${id}`, {
    params: options,
  });
  return res.data.data;
}

export async function searchRestaurants(params: {
  q: string;
  page?: number;
  limit?: number;
}) {
  const res = await api.get<ApiResponse<RestaurantListResult>>(
    "/resto/search",
    { params },
  );
  return res.data.data;
}

export async function getBestSeller(params?: { page?: number; limit?: number }) {
  const res = await api.get<ApiResponse<RestaurantListResult>>(
    "/resto/best-seller",
    { params },
  );
  return res.data.data;
}

export async function getRecommended() {
  const res = await api.get<
    ApiResponse<{ recommendations: RestaurantCardData[] }>
  >("/resto/recommended");
  return res.data.data.recommendations;
}
