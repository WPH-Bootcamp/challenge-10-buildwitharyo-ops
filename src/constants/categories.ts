export interface Category {
  label: string;
  icon: string;
  href: string;
}

export const HOME_CATEGORIES: Category[] = [
  { label: "All Restaurant", icon: "🍔", href: "/resto" },
  { label: "Nearby", icon: "📍", href: "/resto" },
  { label: "Discount", icon: "🏷️", href: "/resto" },
  { label: "Best Seller", icon: "🏆", href: "/resto" },
  { label: "Delivery", icon: "🛵", href: "/resto" },
  { label: "Lunch", icon: "🍳", href: "/resto" },
];
