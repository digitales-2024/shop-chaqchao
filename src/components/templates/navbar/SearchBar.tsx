"use client";

import { Search } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function SearchBar() {
  return (
    <Link
      href={`/categories`}
      aria-label="Buscar"
      className={cn(
        "relative z-10 flex h-full w-full cursor-pointer items-center justify-center rounded-full",
      )}
    >
      <Search className="size-7" strokeWidth={1} />
    </Link>
  );
}
