"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

interface SearchInputProps {
  defaultValue?: string;
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export function SearchInput({
  defaultValue = "",
  placeholder = "Search restaurants, food and drink",
  onSearch,
  className,
}: SearchInputProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(value.trim());
      }}
      className={cn("relative", className)}
    >
      <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-full border border-border bg-background pr-4 pl-12 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
      />
    </form>
  );
}
