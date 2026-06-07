"use client";

import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useFilterStore } from "@/store/filter-store";

const DISTANCE_OPTIONS = [
  { label: "Nearby", value: 0 },
  { label: "Within 1 km", value: 1 },
  { label: "Within 3 km", value: 3 },
  { label: "Within 5 km", value: 5 },
];

const RATING_OPTIONS = [5, 4, 3, 2, 1];

interface FilterPanelProps {
  onApply: () => void;
  onReset: () => void;
}

export function FilterPanel({ onApply, onReset }: FilterPanelProps) {
  const draft = useFilterStore((state) => state.draft);
  const setDraft = useFilterStore((state) => state.setDraft);

  return (
    <div className="space-y-5">
      <p className="text-sm font-bold tracking-wide text-muted-foreground">
        FILTER
      </p>

      <section className="space-y-3">
        <p className="font-bold">Distance</p>
        {DISTANCE_OPTIONS.map((option) => (
          <label
            key={option.label}
            className="flex cursor-pointer items-center gap-3"
          >
            <Checkbox
              checked={draft.range === option.value}
              onCheckedChange={(checked) =>
                setDraft({ range: checked ? option.value : undefined })
              }
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </section>

      <Separator />

      <section className="space-y-3">
        <p className="font-bold">Price</p>
        <PriceField
          placeholder="Minimum Price"
          value={draft.priceMin ?? ""}
          onChange={(value) => setDraft({ priceMin: value })}
        />
        <PriceField
          placeholder="Maximum Price"
          value={draft.priceMax ?? ""}
          onChange={(value) => setDraft({ priceMax: value })}
        />
      </section>

      <Separator />

      <section className="space-y-3">
        <p className="font-bold">Rating</p>
        {RATING_OPTIONS.map((rating) => (
          <label
            key={rating}
            className="flex cursor-pointer items-center gap-3"
          >
            <Checkbox
              checked={draft.rating === rating}
              onCheckedChange={(checked) =>
                setDraft({ rating: checked ? rating : undefined })
              }
            />
            <Star className="size-4 fill-foreground text-foreground" />
            <span className="text-sm">{rating}</span>
          </label>
        ))}
      </section>

      <div className="flex items-center gap-2 pt-2">
        <Button onClick={onApply} className="h-11 flex-1 rounded-full">
          Apply Filter
        </Button>
        <Button
          onClick={onReset}
          variant="ghost"
          className="h-11 rounded-full px-4"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

function PriceField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex items-center overflow-hidden rounded-xl border border-border focus-within:ring-2 focus-within:ring-ring/40">
      <span className="bg-muted px-3 py-2.5 text-sm font-medium text-muted-foreground">
        Rp
      </span>
      <input
        inputMode="numeric"
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value.replace(/[^0-9]/g, ""))
        }
        className="w-full px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
