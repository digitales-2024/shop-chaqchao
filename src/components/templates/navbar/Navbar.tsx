"use client";
import { ChaqchaoCharacter } from "@/assets/images/ChaqchaoCharacter";
import { useWindowScrollPosition } from "@/hooks/use-window-scroll-position";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { MenuList } from "./MenuList";
import { NavList } from "./NavList";

export function Navbar() {
  const { y } = useWindowScrollPosition();

  const isScrolling = y > 1;

  return (
    <header className="flex items-center justify-center">
      <nav
        className={cn(
          "fixed top-0 z-50 mx-auto bg-primary-foreground/50 px-6 backdrop-blur-md transition-all duration-500 sm:top-6 sm:rounded-full",
          {
            "h-16 w-full sm:h-20 sm:max-w-[70rem]": !isScrolling,
            "h-14 w-full sm:h-16 sm:max-w-[50rem]": isScrolling,
          },
        )}
      >
        <div className="hidden w-full grid-cols-3 items-center justify-between sm:grid">
          <div className="flex w-full">
            <Link
              href="/"
              prefetch={true}
              className="flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              <ChaqchaoCharacter
                className={cn("transition-all duration-300", {
                  "h-20": !isScrolling,
                  "h-14": isScrolling,
                })}
              />
            </Link>
          </div>
          <MenuList />
          <div className="inline-flex justify-end">
            <NavList />
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-between sm:hidden">
          <Link
            href="/"
            prefetch={true}
            className="flex items-center justify-center sm:w-auto lg:mr-6"
          >
            <ChaqchaoCharacter
              className={cn("transition-all duration-300", {
                "h-14": !isScrolling,
                "h-10": isScrolling,
              })}
            />
          </Link>
          <NavList />
        </div>
      </nav>
    </header>
  );
}
