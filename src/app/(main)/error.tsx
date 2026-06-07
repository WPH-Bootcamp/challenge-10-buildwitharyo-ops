"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

export default function MainError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-20">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Something went wrong
        </h1>
        <p className="max-w-sm text-muted-foreground">
          An unexpected error occurred while loading this page. Please try again.
        </p>
        <Button onClick={reset} className="rounded-full px-6">
          Try again
        </Button>
      </div>
    </Container>
  );
}
