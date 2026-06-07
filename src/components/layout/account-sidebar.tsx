"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LogOut, MapPin } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { useProfile } from "@/features/auth/hooks/use-profile";
import { getInitials } from "@/lib/format";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Delivery Address", href: "/profile", icon: MapPin },
  { label: "My Orders", href: "/orders", icon: FileText },
];

export function AccountSidebar({ className }: { className?: string }) {
  const { data: user } = useProfile();
  const logout = useLogout();
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "h-fit rounded-2xl border border-border bg-card p-4",
        className,
      )}
    >
      <div className="flex items-center gap-3 px-1 pb-3">
        <Avatar className="size-11">
          <AvatarImage src={user?.avatar ?? undefined} alt={user?.name ?? ""} />
          <AvatarFallback>
            {user ? getInitials(user.name) : ""}
          </AvatarFallback>
        </Avatar>
        <span className="truncate font-bold">{user?.name ?? "Account"}</span>
      </div>

      <Separator />

      <nav className="mt-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-muted" : "hover:bg-muted",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => logout()}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </nav>
    </aside>
  );
}
