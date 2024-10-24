import { ReactNode } from "react";

import { ScrollArea } from "../ui/scroll-area";
import { Footer } from "./footer/Footer";
import { Navbar } from "./navbar/Navbar";

interface LayoutShopProps {
  children: ReactNode;
}

export function LayoutShop({ children }: LayoutShopProps) {
  return (
    <ScrollArea className="h-svh">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </ScrollArea>
  );
}
