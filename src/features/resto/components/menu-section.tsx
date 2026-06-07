"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Menu, MenuType } from "@/types/resto";
import { MenuCard } from "./menu-card";

type MenuFilter = "all" | MenuType;

const TABS: { value: MenuFilter; label: string }[] = [
  { value: "all", label: "All Menu" },
  { value: "food", label: "Food" },
  { value: "drink", label: "Drink" },
];

const PAGE_SIZE = 8;

interface MenuSectionProps {
  menus: Menu[];
  getQuantity: (menuId: number) => number;
  onAdd: (menuId: number) => void;
  onIncrement: (menuId: number) => void;
  onDecrement: (menuId: number) => void;
  disabled?: boolean;
}

export function MenuSection({
  menus,
  getQuantity,
  onAdd,
  onIncrement,
  onDecrement,
  disabled,
}: MenuSectionProps) {
  const [filter, setFilter] = useState<MenuFilter>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () => (filter === "all" ? menus : menus.filter((m) => m.type === filter)),
    [menus, filter],
  );

  const shown = filtered.slice(0, visible);

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-extrabold tracking-tight">Menu</h2>

      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => {
              setFilter(tab.value);
              setVisible(PAGE_SIZE);
            }}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
              filter === tab.value
                ? "border-foreground bg-muted text-foreground"
                : "border-border text-muted-foreground hover:bg-muted",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="py-8 text-center text-muted-foreground">
          No menu items in this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {shown.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              quantity={getQuantity(menu.id)}
              onAdd={() => onAdd(menu.id)}
              onIncrement={() => onIncrement(menu.id)}
              onDecrement={() => onDecrement(menu.id)}
              disabled={disabled}
            />
          ))}
        </div>
      )}

      {visible < filtered.length && (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            className="rounded-full px-8"
            onClick={() => setVisible((count) => count + PAGE_SIZE)}
          >
            Show More
          </Button>
        </div>
      )}
    </section>
  );
}
