import { Suspense } from "react";

import { PageLoader } from "@/components/shared/page-loader";
import { CheckoutView } from "@/features/order/components/checkout-view";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <CheckoutView />
    </Suspense>
  );
}
