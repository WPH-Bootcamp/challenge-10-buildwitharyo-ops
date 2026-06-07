import Link from "next/link";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  href?: string;
  actionLabel?: string;
  className?: string;
}

export function SectionHeader({
  title,
  href,
  actionLabel = "See All",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-sm font-semibold text-primary hover:underline"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
