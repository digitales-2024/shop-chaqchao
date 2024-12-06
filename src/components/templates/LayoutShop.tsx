import { ReactNode } from "react";

import { Footer } from "./footer/Footer";
import { LanguageSelector } from "./navbar/LanguageSelector";
import { Navbar } from "./navbar/Navbar";

interface LayoutShopProps {
  children: ReactNode;
}

export function LayoutShop({ children }: LayoutShopProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white">
      <div className="pointer-events-none fixed inset-0 z-10 h-full w-full rounded-none opacity-[0.08] [background-image:url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png');] [background-repeat:repeat;] [background-size:_109px;]"></div>
      <Navbar />
      <main className="py-40">{children}</main>
      <LanguageSelector />
      <Footer />
    </div>
  );
}
