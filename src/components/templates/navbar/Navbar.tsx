"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { CartSheet } from "@/components/cart/CartSheet";

import { LanguageSelector } from "./LanguageSelector";

export function Navbar() {
  const t = useTranslations("navbar");
  const menuList = [
    { label: t("products"), href: "/" },
    { label: t("workshops"), href: "/workshops" },
  ];
  return (
    <header className="flex items-center justify-center">
      <nav className="container fixed top-0 z-50 mx-auto flex items-center justify-center outline-none transition-all duration-500 sm:top-3 sm:rounded-[3rem]">
        <div className="flex h-full w-full flex-row items-center justify-between p-4">
          <LanguageSelector />
          <div className="flex flex-row items-center gap-4">
            {menuList.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                prefetch={true}
                className="relative flex items-center justify-center text-sm font-semibold uppercase hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-row items-center gap-4">
            {/* <UserLogin /> */}
            <CartSheet />
          </div>
        </div>
      </nav>
    </header>
  );
}
