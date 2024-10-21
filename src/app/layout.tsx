import { Providers } from "@/redux/providers";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "@fontsource-variable/nunito";
import "./globals.css";
import { Toaster } from "sonner";

import { LayoutShop } from "@/components/templates/LayoutShop";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const comingSoon = localFont({
  src: "./fonts/ComingSoon.woff",
  variable: "--font-coming-soon",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Chaqchao Chocolate Factory",
  description: "Somos una tienda que ofrece el mejor chocolate del mundo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${comingSoon.variable} ${geistSans.variable} font-nunito antialiased`}
      >
        <Toaster />
        <Providers>
          <LayoutShop>{children}</LayoutShop>
        </Providers>
      </body>
    </html>
  );
}
