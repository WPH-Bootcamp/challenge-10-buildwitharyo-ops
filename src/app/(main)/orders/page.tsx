import { Suspense } from "react";

import { PageLoader } from "@/components/shared/page-loader";
import { OrdersView } from "@/features/order/components/orders-view";

export default function OrdersPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <OrdersView />
    </Suspense>
  );
}
