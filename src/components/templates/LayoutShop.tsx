import { ReactNode } from "react";

import { Footer } from "./footer/Footer";
import { Navbar } from "./navbar/Navbar";

interface LayoutShopProps {
  children: ReactNode;
}

export function LayoutShop({ children }: LayoutShopProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
