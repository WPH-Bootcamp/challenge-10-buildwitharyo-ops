"use client";

import Link from "next/link";
import { ChevronDown, FileText, LogOut, MapPin, User as UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/auth/hooks/use-logout";
import type { User } from "@/types/user";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function UserMenu({ user }: { user: User }) {
  const logout = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
        <Avatar className="size-9">
          <AvatarImage src={user.avatar ?? undefined} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <span className="hidden text-sm font-semibold sm:inline">
          {user.name}
        </span>
        <ChevronDown className="hidden size-4 text-muted-foreground sm:inline" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center gap-3 px-1.5 py-2">
          <Avatar className="size-9">
            <AvatarImage src={user.avatar ?? undefined} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <span className="truncate text-sm font-semibold">{user.name}</span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserIcon />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <MapPin />
            Delivery Address
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/orders">
            <FileText />
            My Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={() => logout()}>
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
