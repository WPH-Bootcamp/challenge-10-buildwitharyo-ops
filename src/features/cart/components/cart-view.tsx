"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/shared/container";
import { EmptyState } from "@/components/shared/empty-state";
import { CartRestaurantGroup } from "@/features/cart/components/cart-restaurant-group";
import { useCart } from "@/features/cart/hooks/use-cart";
import { useCartMutations } from "@/features/cart/hooks/use-cart-mutations";
import type { CartItem } from "@/types/cart";

export function CartView() {
  const router = useRouter();
  const { data: cart, isLoading, isError } = useCart();
  const { update, remove, clear } = useCartMutations();

  const groups = cart?.cart ?? [];
  const pending = update.isPending || remove.isPending || clear.isPending;

  function increment(item: CartItem) {
    update.mutate({ id: item.id, quantity: item.quantity + 1 });
  }

  function decrement(item: CartItem) {
    if (item.quantity > 1) {
      update.mutate({ id: item.id, quantity: item.quantity - 1 });
    } else {
      remove.mutate(item.id);
    }
  }

  function checkout(restaurantId: number) {
    router.push(`/checkout?resto=${restaurantId}`);
  }

  return (
    <Container className="space-y-6 py-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight">My Cart</h1>
        {groups.length > 0 && (
          <Button
            variant="ghost"
            className="rounded-full text-destructive hover:text-destructive"
            disabled={pending}
            onClick={() => clear.mutate()}
          >
            Clear Cart
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-5">
          {Array.from({ length: 2 }, (_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <EmptyState
          title="Something went wrong"
          description="We couldn't load your cart. Please try again."
        />
      ) : groups.length === 0 ? (
        <EmptyState
          icon="🛍️"
          title="Your cart is empty"
          description="Browse restaurants and add some delicious meals."
          action={
            <Button asChild className="rounded-full px-6">
              <Link href="/resto">Browse restaurants</Link>
            </Button>
          }
        />
      ) : (
        <div className="space-y-5">
          {groups.map((group) => (
            <CartRestaurantGroup
              key={group.restaurant.id}
              group={group}
              onIncrement={increment}
              onDecrement={decrement}
              onCheckout={checkout}
              disabled={pending}
            />
          ))}
        </div>
      )}
    </Container>
  );
}
