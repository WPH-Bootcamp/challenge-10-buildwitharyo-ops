import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FoodyLogo } from "@/components/shared/foody-logo";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
      <FoodyLogo />
      <h1 className="text-3xl font-extrabold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Button asChild className="rounded-full px-6">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
