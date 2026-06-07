"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { clearToken } from "@/lib/auth/token";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return () => {
    clearToken();
    queryClient.clear();
    toast.success("You have been logged out");
    router.replace("/");
  };
}
