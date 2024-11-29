"use client";
import { ChaqchaoCharacter } from "@/assets/images/ChaqchaoCharacter";
import { useMediaQuery } from "@/hooks/use-media-query";
import Link from "next/link";
import { useEffect, useState } from "react";

import { CartSheet } from "@/components/cart/CartSheet";

import { cn } from "@/lib/utils";

import { MenuList } from "./MenuList";
import { NavList } from "./NavList";
import { SheetMenuMobil } from "./SheetMenuMobil";
import { UserLogin } from "./UserLogin";

export function Navbar() {
  const [navBackground, setNavBackground] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isDesktop = useMediaQuery("(max-width: 800px)");
  if (!isDesktop) {
    return (
      <nav
        className={cn(
          "sticky top-6 z-50 mx-auto flex items-center rounded-full bg-[hsla(0,0%,93%,0.72)] px-6 backdrop-blur-lg transition-all duration-500",
          {
            "h-20 w-[70rem]": !navBackground,
            "h-16 w-[50rem]": navBackground,
          },
        )}
      >
        <div className="container mx-auto grid w-full grid-cols-3 items-center justify-between">
          <div className="flex w-full">
            <Link
              href="/"
              prefetch={true}
              className="flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              <ChaqchaoCharacter
                className={cn("transition-all duration-300", {
                  "h-20": !navBackground,
                  "h-14": navBackground,
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
    );
  }

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 flex w-full items-center justify-between p-4 backdrop-blur-sm transition-all duration-300 lg:px-6",
        {
          "bg-white": navBackground,
          "bg-primary-foreground": !navBackground,
        },
      )}
    >
      <div className="container mx-auto grid w-full grid-cols-[auto_1fr] items-center justify-center">
        <div className="flex w-full">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <ChaqchaoCharacter className="h-10" />
          </Link>
        </div>
        <div className="flex items-center justify-end gap-6">
          <CartSheet />
          <UserLogin />
          <SheetMenuMobil />
        </div>
      </div>
    </nav>
  );
}
