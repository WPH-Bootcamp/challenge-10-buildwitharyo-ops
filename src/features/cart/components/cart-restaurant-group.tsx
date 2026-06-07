import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { formatRupiah } from "@/lib/format";
import type { CartGroup, CartItem } from "@/types/cart";

interface CartRestaurantGroupProps {
  group: CartGroup;
  onIncrement: (item: CartItem) => void;
  onDecrement: (item: CartItem) => void;
  onCheckout: (restaurantId: number) => void;
  disabled?: boolean;
}

export function CartRestaurantGroup({
  group,
  onIncrement,
  onDecrement,
  onCheckout,
  disabled,
}: CartRestaurantGroupProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <Link
        href={`/resto/${group.restaurant.id}`}
        className="inline-flex items-center gap-2 font-bold"
      >
        <span className="relative size-7 shrink-0 overflow-hidden rounded-full bg-muted">
          <Image
            src={group.restaurant.logo}
            alt={group.restaurant.name}
            fill
            sizes="28px"
            className="object-cover"
          />
        </span>
        {group.restaurant.name}
        <ChevronRight className="size-4 text-muted-foreground" />
      </Link>

      <div className="mt-4 space-y-4">
        {group.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={item.menu.image}
                  alt={item.menu.foodName}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm">{item.menu.foodName}</p>
                <p className="font-bold">{formatRupiah(item.menu.price)}</p>
              </div>
            </div>
            <QuantityStepper
              value={item.quantity}
              onIncrement={() => onIncrement(item)}
              onDecrement={() => onDecrement(item)}
              disabled={disabled}
            />
          </div>
        ))}
      </div>

      <div className="my-4 border-t border-dashed border-border" />

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-lg font-bold">{formatRupiah(group.subtotal)}</p>
        </div>
        <Button
          variant="dark"
          className="h-11 rounded-full px-8"
          onClick={() => onCheckout(group.restaurant.id)}
          disabled={disabled}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
