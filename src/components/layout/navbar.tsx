"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { FoodyLogo } from "@/components/shared/foody-logo";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useCart } from "@/features/cart/hooks/use-cart";
import { UserMenu } from "./user-menu";

export function Navbar() {
  const { mounted, isAuthenticated, user } = useAuth();
  const { data: cart } = useCart();
  const cartCount = cart?.summary.totalItems ?? 0;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <FoodyLogo />

        <div className="flex items-center gap-2 sm:gap-4">
          {mounted && isAuthenticated && user ? (
            <>
              <Link
                href="/cart"
                aria-label="Cart"
                className="relative grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
              >
                <ShoppingBag className="size-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 grid min-w-5 place-items-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </Link>
              <UserMenu user={user} />
            </>
          ) : mounted ? (
            <>
              <Button
                asChild
                variant="outline"
                className="h-10 rounded-full px-5"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="h-10 rounded-full px-5">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
