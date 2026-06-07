"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/shared/container";
import { EmptyState } from "@/components/shared/empty-state";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { DELIVERY_FEE, SERVICE_FEE } from "@/constants/fees";
import { formatRupiah } from "@/lib/format";
import { checkoutSchema, type CheckoutValues } from "@/lib/validations/checkout";
import { useProfile } from "@/features/auth/hooks/use-profile";
import { useCart } from "@/features/cart/hooks/use-cart";
import { useCartMutations } from "@/features/cart/hooks/use-cart-mutations";
import type { CartItem } from "@/types/cart";
import { useCheckout } from "../hooks/use-checkout";
import { PaymentMethodList } from "./payment-method-list";
import { PaymentSummary } from "./payment-summary";

export function CheckoutView() {
  const searchParams = useSearchParams();
  const restoParam = searchParams.get("resto");
  const restoId = restoParam ? Number(restoParam) : undefined;

  const { data: cart, isLoading } = useCart();
  const { data: profile } = useProfile();
  const { update, remove } = useCartMutations();
  const checkout = useCheckout();

  const allGroups = cart?.cart ?? [];
  const groups = restoId
    ? allGroups.filter((group) => group.restaurant.id === restoId)
    : allGroups;

  const subtotal = groups.reduce((sum, group) => sum + group.subtotal, 0);
  const itemCount = groups.reduce(
    (sum, group) => sum + group.items.reduce((a, i) => a + i.quantity, 0),
    0,
  );
  const total = subtotal + DELIVERY_FEE + SERVICE_FEE;
  const pending = update.isPending || remove.isPending;

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryAddress: "",
      paymentMethod: "BNI",
      phone: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (profile?.phone && !form.getValues("phone")) {
      form.setValue("phone", profile.phone);
    }
  }, [profile, form]);

  function increment(item: CartItem) {
    update.mutate({ id: item.id, quantity: item.quantity + 1 });
  }

  function decrement(item: CartItem) {
    if (item.quantity > 1) {
      update.mutate({ id: item.id, quantity: item.quantity - 1 });
    } else {
      remove.mutate(item.id);
    }
  }

  function onSubmit(values: CheckoutValues) {
    if (groups.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    checkout.mutate({
      paymentMethod: values.paymentMethod,
      deliveryAddress: values.deliveryAddress,
      phone: values.phone,
      notes: values.notes || undefined,
      restaurants: groups.map((group) => ({
        restaurantId: group.restaurant.id,
        items: group.items.map((item) => ({
          menuId: item.menu.id,
          quantity: item.quantity,
        })),
      })),
    });
  }

  if (isLoading) {
    return (
      <Container className="space-y-6 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <Skeleton className="h-72 rounded-2xl" />
          <Skeleton className="h-72 rounded-2xl" />
        </div>
      </Container>
    );
  }

  if (groups.length === 0) {
    return (
      <Container className="space-y-6 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>
        <EmptyState
          icon="🛍️"
          title="Nothing to check out"
          description="Add items to your cart before checking out."
          action={
            <Button asChild className="rounded-full px-6">
              <Link href="/resto">Browse restaurants</Link>
            </Button>
          }
        />
      </Container>
    );
  }

  return (
    <Container className="space-y-6 py-8">
      <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid items-start gap-6 lg:grid-cols-[1fr_380px]"
        >
          <div className="space-y-6">
            <section className="space-y-4 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                <h2 className="font-bold">Delivery Address</h2>
              </div>

              <FormField
                control={form.control}
                name="deliveryAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jl. Sudirman No. 25, Jakarta Pusat, 10220"
                        className="h-12 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        className="h-12 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Add a note for the driver"
                        className="h-12 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            {groups.map((group) => (
              <section
                key={group.restaurant.id}
                className="space-y-4 rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <Link
                    href={`/resto/${group.restaurant.id}`}
                    className="inline-flex items-center gap-2 font-bold"
                  >
                    <span className="relative size-7 shrink-0 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={group.restaurant.logo}
                        alt={group.restaurant.name}
                        fill
                        sizes="28px"
                        className="object-cover"
                      />
                    </span>
                    {group.restaurant.name}
                  </Link>
                  <Button
                    asChild
                    variant="outline"
                    className="h-9 rounded-full"
                  >
                    <Link href={`/resto/${group.restaurant.id}`}>Add item</Link>
                  </Button>
                </div>

                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                        <Image
                          src={item.menu.image}
                          alt={item.menu.foodName}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm">{item.menu.foodName}</p>
                        <p className="font-bold">
                          {formatRupiah(item.menu.price)}
                        </p>
                      </div>
                    </div>
                    <QuantityStepper
                      value={item.quantity}
                      onIncrement={() => increment(item)}
                      onDecrement={() => decrement(item)}
                      disabled={pending}
                    />
                  </div>
                ))}
              </section>
            ))}
          </div>

          <aside className="space-y-5 rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-20">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="gap-3">
                  <h2 className="font-bold">Payment Method</h2>
                  <FormControl>
                    <PaymentMethodList
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border-t border-dashed border-border" />

            <PaymentSummary
              itemCount={itemCount}
              subtotal={subtotal}
              deliveryFee={DELIVERY_FEE}
              serviceFee={SERVICE_FEE}
              total={total}
            />

            <Button
              type="submit"
              variant="dark"
              disabled={checkout.isPending}
              className="h-12 w-full rounded-full"
            >
              {checkout.isPending ? "Processing…" : "Buy"}
            </Button>
          </aside>
        </form>
      </Form>
    </Container>
  );
}
