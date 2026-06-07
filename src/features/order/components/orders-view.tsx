"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { AccountSidebar } from "@/components/layout/account-sidebar";
import { Container } from "@/components/shared/container";
import { EmptyState } from "@/components/shared/empty-state";
import { ORDER_STATUS_TABS } from "@/constants/order-status";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/order";
import { useMyOrders } from "../hooks/use-my-orders";
import { OrderCard } from "./order-card";

const validStatuses = new Set<string>(ORDER_STATUS_TABS.map((tab) => tab.value));

export function OrdersView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const statusParam = searchParams.get("status");
  const status =
    statusParam && validStatuses.has(statusParam)
      ? (statusParam as OrderStatus)
      : undefined;

  const { data, isLoading, isError } = useMyOrders(status);

  const cards = (data?.orders ?? [])
    .flatMap((order) => order.restaurants.map((group) => ({ order, group })))
    .filter(({ group }) => {
      const query = search.trim().toLowerCase();
      if (!query) return true;
      return (
        group.restaurant.name.toLowerCase().includes(query) ||
        group.items.some((item) =>
          item.menuName.toLowerCase().includes(query),
        )
      );
    });

  function setStatus(next?: OrderStatus) {
    const params = new URLSearchParams(searchParams.toString());
    if (next) {
      params.set("status", next);
    } else {
      params.delete("status");
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <Container className="py-8">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <AccountSidebar className="hidden lg:block" />

        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold tracking-tight">My Orders</h1>

          <div className="space-y-4 rounded-2xl border border-border bg-card p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search"
                className="h-11 w-full rounded-full border border-border pr-4 pl-11 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </div>

            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
              <span className="text-sm font-bold">Status</span>
              {ORDER_STATUS_TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() =>
                    setStatus(status === tab.value ? undefined : tab.value)
                  }
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm whitespace-nowrap transition-colors",
                    status === tab.value
                      ? "border-foreground bg-muted font-semibold"
                      : "border-border text-muted-foreground hover:bg-muted",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 2 }, (_, i) => (
                <Skeleton key={i} className="h-48 rounded-2xl" />
              ))}
            </div>
          ) : isError ? (
            <EmptyState
              title="Something went wrong"
              description="We couldn't load your orders. Please try again."
            />
          ) : cards.length === 0 ? (
            <EmptyState
              icon="🧾"
              title="No orders yet"
              description="When you place an order, it will show up here."
            />
          ) : (
            <div className="space-y-4">
              {cards.map(({ order, group }) => (
                <OrderCard
                  key={`${order.id}-${group.restaurant.id}`}
                  order={order}
                  group={group}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
