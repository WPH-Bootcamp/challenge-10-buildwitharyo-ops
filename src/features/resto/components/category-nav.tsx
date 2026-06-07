import Link from "next/link";

import { HOME_CATEGORIES } from "@/constants/categories";

export function CategoryNav() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {HOME_CATEGORIES.map((category) => (
        <Link
          key={category.label}
          href={category.href}
          className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-md"
        >
          <span className="text-3xl" aria-hidden="true">
            {category.icon}
          </span>
          <span className="text-center text-sm font-semibold">
            {category.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
