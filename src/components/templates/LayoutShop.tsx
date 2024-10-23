"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { ScrollArea } from "../ui/scroll-area";
import { Footer } from "./footer/Footer";
import { Navbar } from "./navbar/Navbar";

interface LayoutShopProps {
  children: ReactNode;
}

// Arreglo con las rutas que no necesitan autorización
const noAuthRoutes = [
  "/sign-in",
  "/register",
  "/forgot-password",
  "/terms",
  "/reset-password",
];

export function LayoutShop({ children }: LayoutShopProps) {
  const pathname = usePathname();

  // Verifica si la ruta actual está en el arreglo de rutas que no necesitan autorización
  const isNoAuthRoute = noAuthRoutes.includes(pathname);

  if (isNoAuthRoute) {
    return (
      <>
        <main>{children}</main>
      </>
    );
  }

  return (
    <ScrollArea className="h-svh">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </ScrollArea>
  );
}
