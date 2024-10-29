import "@fontsource-variable/comfortaa";
import "./globals.css";
import { Providers } from "@/redux/providers";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
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

const comfortaaRegular = localFont({
  src: "./fonts/ComfortaaRegular.woff2",
  variable: "--font-comfortaa-regular",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Chaqchao Chocolate Factory",
  description: "Somos una tienda que ofrece el mejor chocolate del mundo.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${comingSoon.variable} ${comfortaaRegular.variable} ${geistSans.variable} font-nunito antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Toaster />
          <Providers>
            <LayoutShop>{children}</LayoutShop>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
