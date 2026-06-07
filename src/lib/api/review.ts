import { api } from "./axios";
import type { ApiResponse } from "@/types/api";
import type { ReviewPayload } from "@/types/review";

export async function createReview(payload: ReviewPayload) {
  const res = await api.post<ApiResponse<unknown>>("/review", payload);
  return res.data;
}
