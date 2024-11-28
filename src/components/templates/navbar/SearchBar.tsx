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
        "relative z-10 flex size-10 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:scale-105",
      )}
    >
      <Search />
    </Link>
  );
}
