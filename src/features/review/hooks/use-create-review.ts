"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createReview } from "@/lib/api/review";
import { getApiErrorMessage } from "@/lib/api/axios";
import { queryKeys } from "@/lib/query/keys";
import type { ReviewPayload } from "@/types/review";

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReviewPayload) => createReview(payload),
    onSuccess: () => {
      toast.success("Thanks for your review!");
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not submit your review."));
    },
  });
}
