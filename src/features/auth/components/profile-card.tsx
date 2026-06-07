"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials } from "@/lib/format";
import { profileSchema, type ProfileValues } from "@/lib/validations/profile";
import { useProfile } from "../hooks/use-profile";
import { useUpdateProfile } from "../hooks/use-update-profile";

export function ProfileCard() {
  const { data: user, isLoading } = useProfile();
  const update = useUpdateProfile();
  const [editing, setEditing] = useState(false);

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    values: { name: user?.name ?? "", phone: user?.phone ?? "" },
  });

  if (isLoading || !user) {
    return <Skeleton className="h-72 max-w-xl rounded-2xl" />;
  }

  function onSubmit(values: ProfileValues) {
    update.mutate(values, { onSuccess: () => setEditing(false) });
  }

  return (
    <div className="max-w-xl rounded-2xl border border-border bg-card p-6">
      <div className="flex justify-center pb-5">
        <Avatar className="size-20">
          <AvatarImage src={user.avatar ?? undefined} alt={user.name} />
          <AvatarFallback className="text-xl">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      </div>

      {editing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input className="h-12 rounded-xl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-2">
              <FormLabel>Email</FormLabel>
              <Input value={user.email} disabled className="h-12 rounded-xl" />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Handphone</FormLabel>
                  <FormControl>
                    <Input type="tel" className="h-12 rounded-xl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                variant="dark"
                disabled={update.isPending}
                className="h-12 flex-1 rounded-full"
              >
                {update.isPending ? "Saving…" : "Save"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="h-12 rounded-full px-6"
                onClick={() => {
                  setEditing(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="space-y-4">
          <InfoRow label="Name" value={user.name} />
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Nomor Handphone" value={user.phone} />
          <Button
            variant="dark"
            className="h-12 w-full rounded-full"
            onClick={() => setEditing(true)}
          >
            Update Profile
          </Button>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
