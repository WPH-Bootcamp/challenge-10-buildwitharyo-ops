import Link from "next/link";

import { cn } from "@/lib/utils";

// Coordinates are rounded so the server and client render identical markup
// (raw Math.cos/sin can differ in the last digit across JS engines).
const SPOKES = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * 30 * Math.PI) / 180;
  return {
    x1: (16 + Math.cos(angle) * 4.5).toFixed(3),
    y1: (16 + Math.sin(angle) * 4.5).toFixed(3),
    x2: (16 + Math.cos(angle) * 14).toFixed(3),
    y2: (16 + Math.sin(angle) * 14).toFixed(3),
  };
});

export function FoodyMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-primary", className)}
      aria-hidden="true"
    >
      {SPOKES.map((spoke, i) => (
        <line
          key={i}
          x1={spoke.x1}
          y1={spoke.y1}
          x2={spoke.x2}
          y2={spoke.y2}
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
