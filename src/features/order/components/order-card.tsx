"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ORDER_STATUS_LABELS } from "@/constants/order-status";
import { formatRupiah } from "@/lib/format";
import { ReviewDialog } from "@/features/review/components/review-dialog";
import type { Order, OrderRestaurant } from "@/types/order";

export function OrderCard({
  order,
  group,
}: {
  order: Order;
  group: OrderRestaurant;
}) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const canReview = order.status === "done" || order.status === "delivered";
  const menuIds = group.items.map((item) => item.menuId);

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
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
        </Link>
        <Badge variant="secondary">{ORDER_STATUS_LABELS[order.status]}</Badge>
      </div>

      <div className="space-y-3">
        {group.items.map((item) => (
          <div key={item.menuId} className="flex items-center gap-3">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-muted">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.menuName}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <p className="text-sm">{item.menuName}</p>
              <p className="text-sm font-bold">
                {item.quantity} x {formatRupiah(item.price)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed border-border" />

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-lg font-bold">{formatRupiah(group.subtotal)}</p>
        </div>
        {canReview && (
          <Button
            variant="dark"
            className="h-11 rounded-full px-8"
            onClick={() => setReviewOpen(true)}
          >
            Give Review
          </Button>
        )}
      </div>

      <ReviewDialog
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        transactionId={order.transactionId}
        restaurantId={group.restaurant.id}
        menuIds={menuIds}
      />
    </div>
  );
}
