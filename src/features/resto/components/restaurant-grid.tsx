import {
  RestaurantCard,
  RestaurantCardSkeleton,
} from "@/components/shared/restaurant-card";
import { EmptyState } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";
import type { RestaurantCardData } from "@/types/resto";

interface RestaurantGridProps {
  restaurants: RestaurantCardData[];
  isLoading?: boolean;
  isError?: boolean;
  skeletonCount?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  gridClassName?: string;
}

export function RestaurantGrid({
  restaurants,
  isLoading,
  isError,
  skeletonCount = 6,
  emptyTitle = "No restaurants found",
  emptyDescription = "Try adjusting your search or filters.",
  gridClassName,
}: RestaurantGridProps) {
  const gridClasses = cn(
    "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
    gridClassName,
  );

  if (isLoading) {
    return (
      <div className={gridClasses}>
        {Array.from({ length: skeletonCount }, (_, i) => (
          <RestaurantCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Something went wrong"
        description="We couldn't load restaurants. Please try again."
      />
    );
  }

  if (restaurants.length === 0) {
    return (
      <EmptyState
        icon="🍽️"
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className={gridClasses}>
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
