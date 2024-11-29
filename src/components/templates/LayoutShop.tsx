import { Locale } from "@/i18n/config";
import { useLocale } from "next-intl";
import { ReactNode } from "react";

import { Footer } from "./footer/Footer";
import { LanguageSelector } from "./navbar/LanguageSelector";
import { Navbar } from "./navbar/Navbar";

interface LayoutShopProps {
  children: ReactNode;
}

export function LayoutShop({ children }: LayoutShopProps) {
  const locale = useLocale();

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <LanguageSelector defaultValue={locale as Locale} />
      <Footer />
    </>
  );
}
