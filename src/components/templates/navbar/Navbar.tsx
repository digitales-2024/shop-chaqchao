"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { CartSheet } from "@/components/cart/CartSheet";

import { LanguageSelector } from "./LanguageSelector";
import { UserLogin } from "./UserLogin";

export function Navbar() {
  const t = useTranslations("navbar");
  const menuList = [
    { label: t("products"), href: "/" },
    { label: t("workshops"), href: "/workshops" },
  ];
  return (
    <header className="flex items-center justify-center">
      <nav className="fixed top-0 z-50 mx-auto flex w-full max-w-[1025px] items-center justify-center bg-white/60 backdrop-blur-sm">
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
            <CartSheet />
            <UserLogin />
          </div>
        </div>
      </nav>
    </header>
  );
}
