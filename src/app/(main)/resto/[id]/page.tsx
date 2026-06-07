import { notFound } from "next/navigation";

import { RestaurantDetail } from "@/features/resto/components/restaurant-detail";

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurantId = Number(id);

  if (!Number.isFinite(restaurantId) || restaurantId <= 0) {
    notFound();
  }

  return <RestaurantDetail id={restaurantId} />;
}
