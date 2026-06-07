import Link from "next/link";

import { cn } from "@/lib/utils";

export function FoodyMark({ className }: { className?: string }) {
  const spokes = Array.from({ length: 12 }, (_, i) => (i * 30 * Math.PI) / 180);

  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-primary", className)}
      aria-hidden="true"
    >
      {spokes.map((angle, i) => (
        <line
          key={i}
          x1={16 + Math.cos(angle) * 4.5}
          y1={16 + Math.sin(angle) * 4.5}
          x2={16 + Math.cos(angle) * 14}
          y2={16 + Math.sin(angle) * 14}
          stroke="currentColor"
          strokeWidth={2.6}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

interface FoodyLogoProps {
  href?: string;
  className?: string;
  textClassName?: string;
  markClassName?: string;
}

export function FoodyLogo({
  href = "/",
  className,
  textClassName,
  markClassName,
}: FoodyLogoProps) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2", className)}>
      <FoodyMark className={cn("size-7", markClassName)} />
      <span className={cn("text-xl font-extrabold tracking-tight", textClassName)}>
        Foody
      </span>
    </Link>
  );
}
