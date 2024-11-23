import "@fontsource-variable/nunito";
import "./globals.css";
import { Providers } from "@/redux/providers";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ViewTransitions } from "next-view-transitions";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
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
        <head>
          <link
            rel="stylesheet"
            href="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/classic.css"
          />
          <Script
            src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js"
            strategy="afterInteractive"
          />
        </head>
        <body
          className={`${comingSoon.variable} ${geistSans.variable} font-nunito antialiased`}
        >
          <NextIntlClientProvider messages={messages}>
            <Toaster
              richColors
              closeButton
              toastOptions={{
                style: {
                  backgroundColor: "#fff",
                },
              }}
            />
            <Providers>{children}</Providers>
          </NextIntlClientProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
