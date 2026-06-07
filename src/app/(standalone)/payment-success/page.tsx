"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FoodyLogo } from "@/components/shared/foody-logo";
import { EmptyState } from "@/components/shared/empty-state";
import { PAYMENT_METHODS } from "@/constants/payment-methods";
import { formatReviewDate, formatRupiah } from "@/lib/format";
import { readLastOrder } from "@/features/order/last-order";
import { useHydrated } from "@/hooks/use-hydrated";
import type { Order } from "@/types/order";

export default function PaymentSuccessPage() {
  const hydrated = useHydrated();
  const order = useMemo(() => (hydrated ? readLastOrder() : null), [hydrated]);

  if (!hydrated) {
    return null;
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <FoodyLogo />
        </div>

        {order ? (
          <Receipt order={order} />
        ) : (
          <EmptyState
            title="No recent order"
            description="We couldn't find a recent order to show."
            action={
              <Button asChild className="rounded-full px-6">
                <Link href="/orders">See My Orders</Link>
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}

function Receipt({ order }: { order: Order }) {
  const itemCount = order.restaurants.reduce(
    (sum, group) => sum + group.items.reduce((a, i) => a + i.quantity, 0),
    0,
  );
  const paymentName =
    PAYMENT_METHODS.find((method) => method.value === order.paymentMethod)
      ?.name ?? order.paymentMethod;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col items-center gap-3 pb-6 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-neutral-950 text-white">
          <Check className="size-7" />
        </span>
        <div className="space-y-1">
          <h1 className="text-xl font-extrabold">Payment Success</h1>
          <p className="text-sm text-muted-foreground">
            Your payment has been successfully processed.
          </p>
        </div>
      </div>

      <div className="space-y-3 border-t border-dashed border-border py-5">
        <Row label="Date" value={formatReviewDate(order.createdAt)} />
        <Row label="Payment Method" value={paymentName} />
        <Row
          label={`Price (${itemCount} items)`}
          value={formatRupiah(order.pricing.subtotal)}
        />
        <Row label="Delivery Fee" value={formatRupiah(order.pricing.deliveryFee)} />
        <Row label="Service Fee" value={formatRupiah(order.pricing.serviceFee)} />
      </div>

      <div className="flex items-center justify-between border-t border-dashed border-border pt-5">
        <span className="font-bold">Total</span>
        <span className="font-bold">{formatRupiah(order.pricing.totalPrice)}</span>
      </div>

      <Button asChild className="mt-6 h-12 w-full rounded-full">
        <Link href="/orders">See My Orders</Link>
      </Button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
