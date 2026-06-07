import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface RatingStarsProps {
  value: number;
  count?: number;
  className?: string;
  starClassName?: string;
}

export function RatingStars({
  value,
  count = 5,
  className,
  starClassName,
}: RatingStarsProps) {
  const rounded = Math.round(value);

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: count }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < rounded
              ? "fill-foreground text-foreground"
              : "fill-muted text-muted-foreground/40",
            starClassName,
          )}
        />
      ))}
    </div>
  );
}
