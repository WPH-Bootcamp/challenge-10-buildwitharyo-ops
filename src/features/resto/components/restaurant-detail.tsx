"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Share2, Star } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/shared/container";
import { EmptyState } from "@/components/shared/empty-state";
import { CartBar } from "@/features/cart/components/cart-bar";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useCart } from "@/features/cart/hooks/use-cart";
import { useCartMutations } from "@/features/cart/hooks/use-cart-mutations";
import { useRestaurant } from "../hooks/use-restaurant";
import { MenuSection } from "./menu-section";
import { RestaurantGallery } from "./restaurant-gallery";
import { ReviewList } from "./review-list";

export function RestaurantDetail({ id }: { id: number }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { data: restaurant, isLoading, isError } = useRestaurant(id);
  const { data: cart } = useCart();
  const { add, update, remove } = useCartMutations();

  const group = cart?.cart.find((entry) => entry.restaurant.id === id);
  const itemsByMenu = new Map(
    group?.items.map((item) => [item.menu.id, item]) ?? [],
  );
  const pending = add.isPending || update.isPending || remove.isPending;

  function requireAuth() {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to your cart");
      router.push(`/login?redirect=/resto/${id}`);
      return false;
    }
    return true;
  }

  function handleAdd(menuId: number) {
    if (!requireAuth()) return;
    add.mutate({ restaurantId: id, menuId, quantity: 1 });
  }

  function handleIncrement(menuId: number) {
    if (!requireAuth()) return;
    const item = itemsByMenu.get(menuId);
    if (item) {
      update.mutate({ id: item.id, quantity: item.quantity + 1 });
    } else {
      add.mutate({ restaurantId: id, menuId, quantity: 1 });
    }
  }

  function handleDecrement(menuId: number) {
    const item = itemsByMenu.get(menuId);
    if (!item) return;
    if (item.quantity > 1) {
      update.mutate({ id: item.id, quantity: item.quantity - 1 });
    } else {
      remove.mutate(item.id);
    }
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not copy link");
    }
  }

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (isError || !restaurant) {
    return (
      <Container className="py-16">
        <EmptyState
          icon="🍽️"
          title="Restaurant not found"
          description="The restaurant you are looking for is unavailable."
        />
      </Container>
    );
  }

  const itemCount =
    group?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <>
      <Container className="space-y-8 py-8">
        <RestaurantGallery images={restaurant.images} name={restaurant.name} />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-muted">
              <Image
                src={restaurant.logo}
                alt={restaurant.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold tracking-tight">
                {restaurant.name}
              </h1>
              <div className="flex items-center gap-1 text-sm">
                <Star className="size-4 fill-foreground text-foreground" />
                <span className="font-semibold">{restaurant.star}</span>
              </div>
              <p className="text-sm text-muted-foreground">{restaurant.place}</p>
            </div>
          </div>

          <Button
            variant="outline"
            className="gap-2 rounded-full"
            onClick={handleShare}
          >
            <Share2 className="size-4" />
            Share
          </Button>
        </div>

        <Separator />

        <MenuSection
          menus={restaurant.menus}
          getQuantity={(menuId) => itemsByMenu.get(menuId)?.quantity ?? 0}
          onAdd={handleAdd}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          disabled={pending}
        />

        <Separator />

        <ReviewList
          reviews={restaurant.reviews}
          averageRating={restaurant.averageRating ?? restaurant.star}
          totalReviews={restaurant.totalReviews}
        />
      </Container>

      <CartBar itemCount={itemCount} total={group?.subtotal ?? 0} />
    </>
  );
}

function DetailSkeleton() {
  return (
    <Container className="space-y-8 py-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <Skeleton className="aspect-[4/3] rounded-2xl" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="aspect-square rounded-2xl" />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="size-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-56 rounded-2xl" />
        ))}
      </div>
    </Container>
  );
}
