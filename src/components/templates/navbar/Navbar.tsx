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
          "fixed top-6 z-50 mx-auto rounded-full bg-primary-foreground/50 px-6 backdrop-blur-md transition-all duration-500",
          {
            "h-20 w-[70rem]": !isScrolling,
            "h-16 w-[50rem]": isScrolling,
          },
        )}
      >
        <div className="grid w-full grid-cols-3 items-center justify-between">
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
      </nav>
    </header>
  );
}
