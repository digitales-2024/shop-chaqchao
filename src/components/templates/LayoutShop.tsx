import { ReactNode } from "react";

import { Footer } from "./footer/Footer";
import { LanguageSelector } from "./navbar/LanguageSelector";
import { Navbar } from "./navbar/Navbar";

interface LayoutShopProps {
  children: ReactNode;
}

export function LayoutShop({ children }: LayoutShopProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      <Navbar />
      <main>{children}</main>
      <LanguageSelector />
      <Footer />
    </div>
  );
}
