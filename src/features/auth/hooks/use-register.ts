"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { register, type RegisterInput } from "@/lib/api/auth";
import { getApiErrorMessage } from "@/lib/api/axios";
import { setToken } from "@/lib/auth/token";
import { queryKeys } from "@/lib/query/keys";

export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: RegisterInput) => register(input),
    onSuccess: (data) => {
      setToken(data.token);
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
      toast.success("Your account is ready. Let's eat!");
      router.replace("/");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Registration failed."));
    },
  });
}
