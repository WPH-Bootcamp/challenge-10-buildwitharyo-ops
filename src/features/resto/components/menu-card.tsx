import Image from "next/image";

import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { formatRupiah } from "@/lib/format";
import type { Menu } from "@/types/resto";

interface MenuCardProps {
  menu: Menu;
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  disabled?: boolean;
}

export function MenuCard({
  menu,
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
  disabled,
}: MenuCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-square bg-muted">
        <Image
          src={menu.image}
          alt={menu.foodName}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="space-y-2 p-3">
        <p className="truncate text-sm font-medium">{menu.foodName}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold">{formatRupiah(menu.price)}</span>
          {quantity > 0 ? (
            <QuantityStepper
              value={quantity}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              disabled={disabled}
            />
          ) : (
            <Button
              variant="dark"
              onClick={onAdd}
              disabled={disabled}
              className="h-9 rounded-full px-6"
            >
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
