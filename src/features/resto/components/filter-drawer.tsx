"use client";

import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFilterStore } from "@/store/filter-store";
import { FilterPanel } from "./filter-panel";

interface FilterDrawerProps {
  onApply: () => void;
  onReset: () => void;
}

export function FilterDrawer({ onApply, onReset }: FilterDrawerProps) {
  const isOpen = useFilterStore((state) => state.isDrawerOpen);
  const openDrawer = useFilterStore((state) => state.openDrawer);
  const closeDrawer = useFilterStore((state) => state.closeDrawer);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => (open ? openDrawer() : closeDrawer())}
    >
      <SheetTrigger asChild>
        <Button variant="outline" className="h-11 gap-2 rounded-full">
          <SlidersHorizontal className="size-4" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] gap-0 overflow-y-auto">
        <SheetHeader className="sr-only">
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>
        <div className="px-4 pt-10 pb-6">
          <FilterPanel
            onApply={() => {
              onApply();
              closeDrawer();
            }}
            onReset={onReset}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
