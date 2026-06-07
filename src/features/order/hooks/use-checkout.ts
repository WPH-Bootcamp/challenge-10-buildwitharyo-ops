"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { checkout } from "@/lib/api/order";
import { getApiErrorMessage } from "@/lib/api/axios";
import { queryKeys } from "@/lib/query/keys";
import { LAST_ORDER_KEY } from "@/features/order/last-order";
import type { CheckoutPayload } from "@/types/order";

export function useCheckout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CheckoutPayload) => checkout(payload),
    onSuccess: (transaction) => {
      sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(transaction));
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      toast.success("Order placed successfully");
      router.replace("/payment-success");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Checkout failed. Please try again."));
    },
  });
}
