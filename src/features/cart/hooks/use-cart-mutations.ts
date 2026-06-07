"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  addToCart,
  clearCart,
  removeCartItem,
  updateCartItem,
  type AddToCartInput,
} from "@/lib/api/cart";
import { getApiErrorMessage } from "@/lib/api/axios";
import { queryKeys } from "@/lib/query/keys";

export function useCartMutations() {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.cart });

  const add = useMutation({
    mutationFn: (input: AddToCartInput) => addToCart(input),
    onSuccess: () => {
      invalidate();
      toast.success("Added to cart");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const update = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      updateCartItem(id, quantity),
    onSuccess: invalidate,
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const remove = useMutation({
    mutationFn: (id: number) => removeCartItem(id),
    onSuccess: invalidate,
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const clear = useMutation({
    mutationFn: () => clearCart(),
    onSuccess: () => {
      invalidate();
      toast.success("Cart cleared");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  return { add, update, remove, clear };
}
