"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Container } from "@/components/shared/container";
import { SearchInput } from "@/components/shared/search-input";
import type { RestaurantFilters } from "@/lib/api/resto";
import { useFilterStore } from "@/store/filter-store";
import { FilterDrawer } from "./filter-drawer";
import { FilterSidebar } from "./filter-sidebar";
import { RestaurantGrid } from "./restaurant-grid";
import { useRestaurants } from "../hooks/use-restaurants";
import { useSearchRestaurants } from "../hooks/use-search";

function setParam(params: URLSearchParams, key: string, value?: string | number) {
  if (value === undefined || value === "" || value === null) {
    params.delete(key);
  } else {
    params.set(key, String(value));
  }
}

export function RestoExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hydrate = useFilterStore((state) => state.hydrate);
  const resetDraft = useFilterStore((state) => state.resetDraft);

  const query = searchParams.get("q") ?? "";
  const range = searchParams.get("range");
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");
  const rating = searchParams.get("rating");

  const filters = useMemo<RestaurantFilters>(
    () => ({
      range: range ? Number(range) : undefined,
      priceMin: priceMin ? Number(priceMin) : undefined,
      priceMax: priceMax ? Number(priceMax) : undefined,
      rating: rating ? Number(rating) : undefined,
      limit: 24,
    }),
    [range, priceMin, priceMax, rating],
  );

  useEffect(() => {
    hydrate({
      range: range ? Number(range) : undefined,
      priceMin: priceMin ?? undefined,
      priceMax: priceMax ?? undefined,
      rating: rating ? Number(rating) : undefined,
    });
  }, [hydrate, range, priceMin, priceMax, rating]);

  const isSearching = query.length > 0;
  const search = useSearchRestaurants(query);
  const list = useRestaurants(filters, { enabled: !isSearching });
  const activeQuery = isSearching ? search : list;
  const restaurants = activeQuery.data?.restaurants ?? [];

  function updateParams(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    const next = params.toString();
    router.push(next ? `${pathname}?${next}` : pathname);
  }

  function handleSearch(value: string) {
    updateParams((params) => setParam(params, "q", value));
  }

  function applyFilters() {
    const draft = useFilterStore.getState().draft;
    updateParams((params) => {
      params.delete("q");
      setParam(params, "range", draft.range);
      setParam(params, "priceMin", draft.priceMin);
      setParam(params, "priceMax", draft.priceMax);
      setParam(params, "rating", draft.rating);
    });
  }

  function resetFilters() {
    resetDraft();
    updateParams((params) => {
      ["range", "priceMin", "priceMax", "rating"].forEach((key) =>
        params.delete(key),
      );
    });
  }

  return (
    <Container className="space-y-6 py-8">
      <h1 className="text-3xl font-extrabold tracking-tight">
        {isSearching ? `Results for "${query}"` : "All Restaurant"}
      </h1>

      <SearchInput
        key={query}
        defaultValue={query}
        onSearch={handleSearch}
        className="max-w-2xl"
      />

      <div className="lg:hidden">
        <FilterDrawer onApply={applyFilters} onReset={resetFilters} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <FilterSidebar
          className="hidden lg:block"
          onApply={applyFilters}
          onReset={resetFilters}
        />
        <RestaurantGrid
          restaurants={restaurants}
          isLoading={activeQuery.isLoading}
          isError={activeQuery.isError}
          gridClassName="lg:grid-cols-2"
          skeletonCount={6}
        />
      </div>
    </Container>
  );
}
