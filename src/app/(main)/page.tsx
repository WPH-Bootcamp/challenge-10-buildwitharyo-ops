"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SearchInput } from "@/components/shared/search-input";
import { SectionHeader } from "@/components/shared/section-header";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { CategoryNav } from "@/features/resto/components/category-nav";
import { RestaurantGrid } from "@/features/resto/components/restaurant-grid";
import { useRecommended } from "@/features/resto/hooks/use-recommended";
import { useRestaurants } from "@/features/resto/hooks/use-restaurants";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const recommended = useRecommended(isAuthenticated);
  const restaurants = useRestaurants(
    { page: 1, limit: 12 },
    { enabled: !isAuthenticated },
  );

  const cards = isAuthenticated
    ? (recommended.data ?? [])
    : (restaurants.data?.restaurants ?? []);
  const isLoading = isAuthenticated
    ? recommended.isLoading
    : restaurants.isLoading;
  const isError = isAuthenticated ? recommended.isError : restaurants.isError;

  function handleSearch(query: string) {
    router.push(query ? `/resto?q=${encodeURIComponent(query)}` : "/resto");
  }

  return (
    <>
      <section className="relative h-[420px] sm:h-[460px]">
        <Image
          src="/auth-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <Container className="relative flex h-full flex-col items-center justify-center gap-4 text-center text-white">
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Explore Culinary Experiences
          </h1>
          <p className="max-w-xl text-white/90">
            Search and refine your choice to discover the perfect restaurant.
          </p>
          <SearchInput className="w-full max-w-xl" onSearch={handleSearch} />
        </Container>
      </section>

      <Container className="space-y-12 py-10">
        <CategoryNav />

        <section className="space-y-5">
          <SectionHeader title="Recommended" href="/resto" />
          <RestaurantGrid
            restaurants={cards}
            isLoading={isLoading}
            isError={isError}
            skeletonCount={9}
          />
          <div className="flex justify-center pt-2">
            <Button asChild variant="outline" className="rounded-full px-8">
              <Link href="/resto">Show More</Link>
            </Button>
          </div>
        </section>
      </Container>
    </>
  );
}
