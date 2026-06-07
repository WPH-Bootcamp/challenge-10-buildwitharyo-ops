"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { login } from "@/lib/api/auth";
import { getApiErrorMessage } from "@/lib/api/axios";
import { setToken } from "@/lib/auth/token";
import { queryKeys } from "@/lib/query/keys";

interface LoginVariables {
  email: string;
  password: string;
  remember?: boolean;
}

export function useLogin(redirectTo = "/") {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: LoginVariables) =>
      login({ email, password }),
    onSuccess: (data, variables) => {
      setToken(data.token, variables.remember ?? true);
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
      toast.success("Welcome back!");
      router.replace(redirectTo);
    },
    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "Login failed. Please check your details."),
      );
    },
  });
}
