import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import type { RestaurantCardData } from "@/types/resto";

export function RestaurantCard({
  restaurant,
  className,
}: {
  restaurant: RestaurantCardData;
  className?: string;
}) {
  return (
    <Link
      href={`/resto/${restaurant.id}`}
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-border bg-card p-3 transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
        <Image
          src={restaurant.logo}
          alt={restaurant.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 space-y-1">
        <p className="truncate font-bold">{restaurant.name}</p>
        <div className="flex items-center gap-1 text-sm">
          <Star className="size-4 fill-foreground text-foreground" />
          <span className="font-semibold">{restaurant.star}</span>
        </div>
        <p className="truncate text-sm text-muted-foreground">
          {restaurant.place}
          {restaurant.distance != null && ` · ${restaurant.distance} km`}
        </p>
      </div>
    </Link>
  );
}

export function RestaurantCardSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
      <div className="size-20 shrink-0 animate-pulse rounded-xl bg-muted" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
