"use client";
import { ChaqchaoCharacter } from "@/assets/images/ChaqchaoCharacter";
import { ChaqchaoName } from "@/assets/images/ChaqchaoName";
import Link from "next/link";

import { CartSheet } from "@/components/cart/CartSheet";

import { cn } from "@/lib/utils";

import { MenuList } from "./MenuList";
import { SearchBar } from "./SearchBar";
import { UserLogin } from "./UserLogin";

export function Navbar() {
  return (
    <nav
      className={cn(
        "fixed z-50 flex w-full items-center justify-between bg-white p-4 lg:px-6",
        {},
      )}
    >
      <div className="grid w-full grid-cols-3 items-center justify-center">
        <div className="flex w-full">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <ChaqchaoCharacter className="h-24" />
            <ChaqchaoName className="w-48" />
          </Link>
        </div>
        <div className="inline-flex w-full justify-center">
          <MenuList />
        </div>
        <div className="flex items-center justify-end gap-4">
          <SearchBar />
          <CartSheet />
          <UserLogin />
        </div>
      </div>
    </nav>
  );
}
