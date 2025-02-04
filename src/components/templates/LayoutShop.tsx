import { ReactNode } from "react";

import WhatsAppButton from "@/components/social/Whatsapp";

import { Footer } from "./footer/Footer";
import { LanguageSelector } from "./navbar/LanguageSelector";
import { Navbar } from "./navbar/Navbar";
interface LayoutShopProps {
  children: ReactNode;
}

export function LayoutShop({ children }: LayoutShopProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white">
      <Navbar />
      <main className="container mx-auto py-40">{children}</main>
      <LanguageSelector />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
