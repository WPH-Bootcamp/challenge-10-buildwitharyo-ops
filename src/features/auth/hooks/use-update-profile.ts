"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateProfile, type UpdateProfileInput } from "@/lib/api/auth";
import { getApiErrorMessage } from "@/lib/api/axios";
import { queryKeys } from "@/lib/query/keys";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateProfileInput) => updateProfile(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
      toast.success("Profile updated");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not update profile."));
    },
  });
}
