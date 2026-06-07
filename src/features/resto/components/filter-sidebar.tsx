import { cn } from "@/lib/utils";
import { FilterPanel } from "./filter-panel";

interface FilterSidebarProps {
  onApply: () => void;
  onReset: () => void;
  className?: string;
}

export function FilterSidebar({
  onApply,
  onReset,
  className,
}: FilterSidebarProps) {
  return (
    <aside
      className={cn(
        "h-fit rounded-2xl border border-border bg-card p-5",
        className,
      )}
    >
      <FilterPanel onApply={onApply} onReset={onReset} />
    </aside>
  );
}
