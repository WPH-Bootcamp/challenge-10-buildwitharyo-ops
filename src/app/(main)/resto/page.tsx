import { Suspense } from "react";

import { PageLoader } from "@/components/shared/page-loader";
import { RestoExplorer } from "@/features/resto/components/resto-explorer";

export default function RestoPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RestoExplorer />
    </Suspense>
  );
}
