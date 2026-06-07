"use client";

import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disabled?: boolean;
  className?: string;
}

export function QuantityStepper({
  value,
  onIncrement,
  onDecrement,
  disabled,
  className,
}: QuantityStepperProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        type="button"
        onClick={onDecrement}
        disabled={disabled}
        aria-label="Decrease quantity"
        className="grid size-8 place-items-center rounded-full bg-neutral-950 text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus className="size-4" />
      </button>
      <span className="w-5 text-center font-semibold tabular-nums">{value}</span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={disabled}
        aria-label="Increase quantity"
        className="grid size-8 place-items-center rounded-full bg-neutral-950 text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
