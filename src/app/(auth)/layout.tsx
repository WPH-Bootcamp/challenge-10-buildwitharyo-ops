import Image from "next/image";

import { FoodyLogo } from "@/components/shared/foody-logo";
import { AuthTabs } from "@/features/auth/components/auth-tabs";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="/auth-hero.jpg"
          alt="A freshly made cheeseburger with fries"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
      </div>

      <div className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-3">
            <FoodyLogo />
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight">
                Welcome Back
              </h1>
              <p className="text-muted-foreground">
                Good to see you again! Let&apos;s eat
              </p>
            </div>
          </div>

          <AuthTabs />
          {children}
        </div>
      </div>
    </div>
  );
}
