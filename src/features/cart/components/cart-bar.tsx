"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { formatRupiah } from "@/lib/format";

interface CartBarProps {
  itemCount: number;
  total: number;
}

export function CartBar({ itemCount, total }: CartBarProps) {
  if (itemCount <= 0) {
    return null;
  }

  return (
    <div className="sticky bottom-0 z-40 border-t border-border bg-background/95 py-3 backdrop-blur">
      <Container className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShoppingBag className="size-6" />
          <div>
            <p className="text-sm text-muted-foreground">
              {itemCount} {itemCount === 1 ? "Item" : "Items"}
            </p>
            <p className="text-lg font-bold">{formatRupiah(total)}</p>
          </div>
        </div>
        <Button asChild variant="dark" className="h-12 rounded-full px-10">
          <Link href="/checkout">Checkout</Link>
        </Button>
      </Container>
    </div>
  );
}
