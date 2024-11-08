import "@fontsource-variable/comfortaa";
import "@fontsource-variable/nunito";
import "./globals.css";
import { Providers } from "@/redux/providers";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ViewTransitions } from "next-view-transitions";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <ViewTransitions>
      <html lang={locale}>
        <body
          className={`${comingSoon.variable} ${geistSans.variable} font-nunito antialiased`}
        >
          <NextIntlClientProvider messages={messages}>
            <Toaster richColors />
            <Providers>{children}</Providers>
          </NextIntlClientProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
